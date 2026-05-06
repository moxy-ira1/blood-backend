const { Op } = require('sequelize');
const { InventoryUnit, User, sequelize } = require('../models');
const { INVENTORY_STATUS, AUDIT_ACTIONS } = require('../models/enums');
const { AuditService } = require('./AuditService');
const { ApiError } = require('../utils/ApiError');

class InventoryService {
  static getExpiryDays() {
    return Number(process.env.BLOOD_EXPIRY_DAYS || 42);
  }

  static async markUnitDiscarded({ unitId, userId, reason }, transaction) {
    const unit = await InventoryUnit.findByPk(unitId, { transaction });
    if (!unit) throw new ApiError(404, 'NOT_FOUND', 'Inventory unit not found');
    if (unit.status === INVENTORY_STATUS.EXPIRED) throw new ApiError(400, 'INVENTORY_EXPIRED', 'Expired blood cannot be used or discarded');
    if (unit.status === INVENTORY_STATUS.DISCARDED) return unit;

    unit.status = INVENTORY_STATUS.DISCARDED;
    await unit.save({ transaction });

    await AuditService.log({
      userId,
      action: AUDIT_ACTIONS.INVENTORY_UPDATE,
      entityType: 'InventoryUnit',
      entityId: unit.id,
      description: reason ? `Inventory unit discarded: ${reason}` : 'Inventory unit discarded',
      transaction,
    });

    return unit;
  }

  static async useUnit({ unitId, userId }, transaction) {
    const unit = await InventoryUnit.findByPk(unitId, { transaction });
    if (!unit) throw new ApiError(404, 'NOT_FOUND', 'Inventory unit not found');
    if (unit.status === INVENTORY_STATUS.EXPIRED) throw new ApiError(400, 'INVENTORY_EXPIRED', 'Expired blood cannot be used');
    if (unit.status !== INVENTORY_STATUS.AVAILABLE) throw new ApiError(400, 'INVENTORY_NOT_AVAILABLE', 'Inventory unit is not available');

    unit.status = INVENTORY_STATUS.DISCARDED;
    await unit.save({ transaction });

    await AuditService.log({
      userId,
      action: AUDIT_ACTIONS.INVENTORY_UPDATE,
      entityType: 'InventoryUnit',
      entityId: unit.id,
      description: 'Inventory unit used (removed from available stock)',
      transaction,
    });

    return unit;
  }

  static async createFromDonation({ donationId, bloodType, quantityML, createdByUserId }, transaction) {
    const expiryDate = new Date(Date.now() + InventoryService.getExpiryDays() * 24 * 60 * 60 * 1000);
    const unit = await InventoryUnit.create(
      {
        donationId,
        bloodType,
        quantityML,
        status: INVENTORY_STATUS.AVAILABLE,
        expiryDate,
      },
      { transaction }
    );

    await AuditService.log({
      userId: createdByUserId,
      action: AUDIT_ACTIONS.INVENTORY_UPDATE,
      entityType: 'InventoryUnit',
      entityId: unit.id,
      description: `Inventory unit created from donation ${donationId}`,
      transaction,
    });

    return unit;
  }

  static async markExpiredUnits() {
    const now = new Date();
    return sequelize.transaction(async (t) => {
      const [count] = await InventoryUnit.update(
        { status: INVENTORY_STATUS.EXPIRED },
        {
          where: {
            status: INVENTORY_STATUS.AVAILABLE,
            expiryDate: { [Op.lt]: now },
          },
          transaction: t,
        }
      );

      if (count > 0) {
        await AuditService.log({
          userId: null,
          action: AUDIT_ACTIONS.INVENTORY_UPDATE,
          entityType: 'InventoryUnit',
          entityId: null,
          description: `Auto-marked ${count} inventory units as expired`,
          transaction: t,
        });
      }

      // Notify staff (owners + workers) that some units expired
      if (count > 0) {
        const staff = await User.findAll({
          where: { role: ['owner', 'worker'], isActive: true },
          attributes: ['id'],
          transaction: t,
        });

        // Lazy-require to avoid circular deps
        const { NotificationService } = require('./NotificationService');
        await Promise.all(
          staff.map((u) =>
            NotificationService.create(
              {
                userId: u.id,
                title: 'Blood inventory expiry',
                message: `${count} blood unit(s) were marked as expired.`,
                type: 'inventory_expiry',
              },
              t
            )
          )
        );
      }

      return { updated: count };
    });
  }
}

module.exports = { InventoryService };


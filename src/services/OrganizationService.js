const { BtdOrganization, sequelize } = require('../models');
const { ApiError } = require('../utils/ApiError');
const { AUDIT_ACTIONS } = require('../models/enums');
const { AuditService } = require('./AuditService');

class OrganizationService {
  static async create({ ownerUserId, name, address }) {
    return sequelize.transaction(async (t) => {
      const org = await BtdOrganization.create({ name, address: address || null }, { transaction: t });
      await AuditService.log({
        userId: ownerUserId,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'BtdOrganization',
        entityId: org.id,
        description: `BTD organization created (${name})`,
        transaction: t,
      });
      return org;
    });
  }

  static async update({ ownerUserId, orgId, patch }) {
    return sequelize.transaction(async (t) => {
      const org = await BtdOrganization.findByPk(orgId, { transaction: t });
      if (!org) throw new ApiError(404, 'NOT_FOUND', 'Organization not found');
      if (patch.name !== undefined) org.name = patch.name;
      if (patch.address !== undefined) org.address = patch.address;
      await org.save({ transaction: t });

      await AuditService.log({
        userId: ownerUserId,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'BtdOrganization',
        entityId: org.id,
        description: `BTD organization updated (${org.id})`,
        transaction: t,
      });
      return org;
    });
  }

  static async remove({ ownerUserId, orgId }) {
    return sequelize.transaction(async (t) => {
      const org = await BtdOrganization.findByPk(orgId, { transaction: t });
      if (!org) throw new ApiError(404, 'NOT_FOUND', 'Organization not found');
      await org.destroy({ transaction: t });

      await AuditService.log({
        userId: ownerUserId,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'BtdOrganization',
        entityId: orgId,
        description: `BTD organization deleted (${orgId})`,
        transaction: t,
      });
      return { id: orgId };
    });
  }
}

module.exports = { OrganizationService };


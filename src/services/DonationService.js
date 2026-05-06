const { sequelize, User, Donation } = require('../models');
const { USER_ROLES, ELIGIBILITY, AUDIT_ACTIONS } = require('../models/enums');
const { ApiError } = require('../utils/ApiError');
const { InventoryService } = require('./InventoryService');
const { AuditService } = require('./AuditService');
const { NotificationService } = require('./NotificationService');

class DonationService {
  static getCooldownDays() {
    return Number(process.env.DONATION_COOLDOWN_DAYS || 56);
  }

  static isCooldownSatisfied(lastDonationDate) {
    if (!lastDonationDate) return true;
    const ms = DonationService.getCooldownDays() * 24 * 60 * 60 * 1000;
    return Date.now() - new Date(lastDonationDate).getTime() >= ms;
  }

  static async createDonation({ workerUserId, donorId, bloodType, quantityML }) {
    return sequelize.transaction(async (t) => {
      const worker = await User.findByPk(workerUserId, { transaction: t });
      if (!worker || worker.role !== USER_ROLES.WORKER) throw new ApiError(403, 'FORBIDDEN', 'Only workers can record donations');

      const donor = await User.findByPk(donorId, { transaction: t });
      if (!donor || donor.role !== USER_ROLES.DONOR) throw new ApiError(404, 'NOT_FOUND', 'Donor not found');

      if (donor.eligibilityStatus !== ELIGIBILITY.ELIGIBLE) {
        throw new ApiError(400, 'DONOR_NOT_ELIGIBLE', 'Donor is not eligible to donate');
      }

      if (!DonationService.isCooldownSatisfied(donor.lastDonationDate)) {
        throw new ApiError(400, 'DONATION_COOLDOWN', `Donor must wait ${DonationService.getCooldownDays()} days between donations`);
      }

      const donation = await Donation.create(
        {
          donorId,
          workerId: workerUserId,
          bloodType,
          quantityML,
          donatedAt: new Date(),
        },
        { transaction: t }
      );

      donor.lastDonationDate = donation.donatedAt;
      donor.eligibilityStatus = ELIGIBILITY.NOT_ELIGIBLE;
      await donor.save({ transaction: t });

      const inventoryUnit = await InventoryService.createFromDonation(
        { donationId: donation.id, bloodType, quantityML, createdByUserId: workerUserId },
        t
      );

      await NotificationService.create(
        {
          userId: donorId,
          title: 'Donation successful',
          message: `Thank you! Your donation was recorded. You will be eligible again after ${DonationService.getCooldownDays()} days.`,
          type: 'donation',
        },
        t
      );

      await AuditService.log({
        userId: workerUserId,
        action: AUDIT_ACTIONS.CREATE_DONATION,
        entityType: 'Donation',
        entityId: donation.id,
        description: `Donation recorded for donor ${donorId} (${quantityML}ml ${bloodType})`,
        transaction: t,
      });

      return { donation, inventoryUnit, donor };
    });
  }
}

module.exports = { DonationService };


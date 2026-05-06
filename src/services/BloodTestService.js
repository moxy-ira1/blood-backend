const { sequelize, User, BloodTest } = require('../models');
const { USER_ROLES, AUDIT_ACTIONS } = require('../models/enums');
const { ApiError } = require('../utils/ApiError');
const { EligibilityService } = require('./EligibilityService');
const { AuditService } = require('./AuditService');
const { NotificationService } = require('./NotificationService');

class BloodTestService {
  static async createBloodTest({ workerUserId, donorId, results }) {
    return sequelize.transaction(async (t) => {
      const worker = await User.findByPk(workerUserId, { transaction: t });
      if (!worker || worker.role !== USER_ROLES.WORKER) throw new ApiError(403, 'FORBIDDEN', 'Only workers can create blood tests');

      const donor = await User.findByPk(donorId, { transaction: t });
      if (!donor || donor.role !== USER_ROLES.DONOR) throw new ApiError(404, 'NOT_FOUND', 'Donor not found');

      const test = await BloodTest.create(
        {
          donorId,
          workerId: workerUserId,
          hivPositive: Boolean(results.hivPositive),
          hepatitisBPositive: Boolean(results.hepatitisBPositive),
          hepatitisCPositive: Boolean(results.hepatitisCPositive),
          malariaPositive: Boolean(results.malariaPositive),
          hemoglobin: results.hemoglobin,
          notes: results.notes || null,
        },
        { transaction: t }
      );

      const newEligibility = EligibilityService.evaluateBloodTest({
        hivPositive: test.hivPositive,
        hepatitisBPositive: test.hepatitisBPositive,
        hepatitisCPositive: test.hepatitisCPositive,
        malariaPositive: test.malariaPositive,
        hemoglobin: test.hemoglobin,
      });

      const eligibilityChanged = donor.eligibilityStatus !== newEligibility;
      donor.eligibilityStatus = newEligibility;
      await donor.save({ transaction: t });

      await AuditService.log({
        userId: workerUserId,
        action: AUDIT_ACTIONS.CREATE_BLOOD_TEST,
        entityType: 'BloodTest',
        entityId: test.id,
        description: `Blood test created for donor ${donorId}. Eligibility=${newEligibility}`,
        transaction: t,
      });

      await NotificationService.create(
        {
          userId: donorId,
          title: 'Blood test result recorded',
          message: eligibilityChanged
            ? `Your eligibility status changed to: ${newEligibility}`
            : `Your blood test was recorded. Eligibility: ${newEligibility}`,
          type: 'blood_test',
        },
        t
      );

      return { test, donor };
    });
  }
}

module.exports = { BloodTestService };


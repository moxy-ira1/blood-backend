const { ApiError } = require('../utils/ApiError');
const { BloodTestService } = require('../services/BloodTestService');

class BloodTestController {
  static async create(req, res, next) {
    try {
      const { donorId, hivPositive, hepatitisBPositive, hepatitisCPositive, malariaPositive, hemoglobin, notes } = req.body || {};
      if (!donorId) throw new ApiError(400, 'VALIDATION_ERROR', 'donorId is required');
      if (hemoglobin === undefined || hemoglobin === null) throw new ApiError(400, 'VALIDATION_ERROR', 'hemoglobin is required');

      const { test, donor } = await BloodTestService.createBloodTest({
        workerUserId: req.user.id,
        donorId,
        results: { hivPositive, hepatitisBPositive, hepatitisCPositive, malariaPositive, hemoglobin, notes },
      });

      return res.status(201).json({ ok: true, data: { test, donor } });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { BloodTestController };


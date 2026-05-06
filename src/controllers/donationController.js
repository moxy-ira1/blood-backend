const { ApiError } = require('../utils/ApiError');
const { DonationService } = require('../services/DonationService');

class DonationController {
  static async create(req, res, next) {
    try {
      const { donorId, bloodType, quantityML } = req.body || {};
      if (!donorId) throw new ApiError(400, 'VALIDATION_ERROR', 'donorId is required');
      if (!bloodType) throw new ApiError(400, 'VALIDATION_ERROR', 'bloodType is required');
      if (!quantityML) throw new ApiError(400, 'VALIDATION_ERROR', 'quantityML is required');

      const data = await DonationService.createDonation({
        workerUserId: req.user.id,
        donorId,
        bloodType,
        quantityML: Number(quantityML),
      });
      return res.status(201).json({ ok: true, data });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { DonationController };


const { InventoryUnit } = require('../models');
const { InventoryService } = require('../services/InventoryService');
const { ApiError } = require('../utils/ApiError');

class InventoryController {
  static async list(req, res, next) {
    try {
      const items = await InventoryUnit.findAll({ order: [['createdAt', 'DESC']] });
      return res.json({ ok: true, data: items });
    } catch (e) {
      return next(e);
    }
  }

  static async discard(req, res, next) {
    try {
      const { unitId } = req.params;
      const { reason } = req.body || {};
      if (!unitId) throw new ApiError(400, 'VALIDATION_ERROR', 'unitId is required');

      const unit = await InventoryService.markUnitDiscarded({ unitId, userId: req.user.id, reason }, null);
      return res.json({ ok: true, data: unit });
    } catch (e) {
      return next(e);
    }
  }

  static async use(req, res, next) {
    try {
      const { unitId } = req.params;
      if (!unitId) throw new ApiError(400, 'VALIDATION_ERROR', 'unitId is required');

      const unit = await InventoryService.useUnit({ unitId, userId: req.user.id }, null);
      return res.json({ ok: true, data: unit });
    } catch (e) {
      return next(e);
    }
  }

  static async markExpired(req, res, next) {
    try {
      const result = await InventoryService.markExpiredUnits();
      return res.json({ ok: true, data: result });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { InventoryController };


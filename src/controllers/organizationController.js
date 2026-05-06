const { BtdOrganization } = require('../models');
const { ApiError } = require('../utils/ApiError');
const { OrganizationService } = require('../services/OrganizationService');

class OrganizationController {
  static async list(req, res, next) {
    try {
      const orgs = await BtdOrganization.findAll({ order: [['createdAt', 'DESC']] });
      return res.json({ ok: true, data: orgs });
    } catch (e) {
      return next(e);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, address } = req.body || {};
      if (!name) throw new ApiError(400, 'VALIDATION_ERROR', 'name is required');
      const org = await OrganizationService.create({ ownerUserId: req.user.id, name, address });
      return res.status(201).json({ ok: true, data: org });
    } catch (e) {
      return next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const { orgId } = req.params;
      const { name, address } = req.body || {};
      const org = await OrganizationService.update({ ownerUserId: req.user.id, orgId, patch: { name, address } });
      return res.json({ ok: true, data: org });
    } catch (e) {
      return next(e);
    }
  }

  static async remove(req, res, next) {
    try {
      const { orgId } = req.params;
      const result = await OrganizationService.remove({ ownerUserId: req.user.id, orgId });
      return res.json({ ok: true, data: result });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { OrganizationController };


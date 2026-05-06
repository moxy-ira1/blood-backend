const bcrypt = require('bcryptjs');
const { User, Donation } = require('../models');
const { ApiError } = require('../utils/ApiError');
const { USER_ROLES, AUDIT_ACTIONS } = require('../models/enums');
const { AuditService } = require('../services/AuditService');
const { AuthService } = require('../services/AuthService');

class UserController {
  static async me(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      return res.json({ ok: true, data: user });
    } catch (e) {
      return next(e);
    }
  }

  // OWNER only
  static async createWorker(req, res, next) {
    try {
      const { fullName, phone, btdOrganizationId } = req.body || {};
      if (!fullName || !phone) throw new ApiError(400, 'VALIDATION_ERROR', 'fullName and phone are required');

      const worker = await AuthService.createWorker(
        { ownerUserId: req.user.id, btdOrganizationId, fullName, phone },
        null
      );

      await AuditService.log({
        userId: req.user.id,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'User',
        entityId: worker.id,
        description: `Worker created (${fullName})`,
      });

      return res.status(201).json({ ok: true, data: worker });
    } catch (e) {
      return next(e);
    }
  }

  // OWNER or WORKER
  static async createDonor(req, res, next) {
    try {
      const { fullName, idNumber, phone, email, btdOrganizationId } = req.body || {};
      if (!fullName || !idNumber) throw new ApiError(400, 'VALIDATION_ERROR', 'fullName and idNumber are required');

      const donor = await AuthService.createDonor(
        { createdByUserId: req.user.id, btdOrganizationId: btdOrganizationId || req.user.btdOrganizationId, fullName, idNumber, phone, email },
        null
      );

      return res.status(201).json({ ok: true, data: donor });
    } catch (e) {
      return next(e);
    }
  }

  // OWNER only
  static async listUsers(req, res, next) {
    try {
      const { role, btdOrganizationId } = req.query;
      const where = {};
      if (role) where.role = role;
      if (btdOrganizationId) where.btdOrganizationId = btdOrganizationId;
      const users = await User.findAll({ where, order: [['createdAt', 'DESC']], limit: 500 });
      return res.json({ ok: true, data: users });
    } catch (e) {
      return next(e);
    }
  }

  // OWNER only: assign user to BTD
  static async assignToOrganization(req, res, next) {
    try {
      const { userId } = req.params;
      const { btdOrganizationId } = req.body || {};
      if (!btdOrganizationId) throw new ApiError(400, 'VALIDATION_ERROR', 'btdOrganizationId is required');

      const user = await User.findByPk(userId);
      if (!user) throw new ApiError(404, 'NOT_FOUND', 'User not found');

      user.btdOrganizationId = btdOrganizationId;
      await user.save();

      await AuditService.log({
        userId: req.user.id,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'User',
        entityId: user.id,
        description: `User assigned to BTD organization ${btdOrganizationId}`,
      });

      return res.json({ ok: true, data: user });
    } catch (e) {
      return next(e);
    }
  }

  // DONOR: view own donation history; OWNER/WORKER can view any donor history
  static async donationHistory(req, res, next) {
    try {
      const donorId = req.params.donorId || req.user.id;
      if (req.user.role === USER_ROLES.DONOR && donorId !== req.user.id) {
        throw new ApiError(403, 'FORBIDDEN', 'Not allowed');
      }

      const donor = await User.findByPk(donorId);
      if (!donor || donor.role !== USER_ROLES.DONOR) throw new ApiError(404, 'NOT_FOUND', 'Donor not found');

      const donations = await Donation.findAll({
        where: { donorId },
        order: [['donatedAt', 'DESC']],
      });
      return res.json({ ok: true, data: { donor, donations } });
    } catch (e) {
      return next(e);
    }
  }

  // OWNER only (helper): set/replace owner password
  static async setOwnerPassword(req, res, next) {
    try {
      const { ownerId, password } = req.body || {};
      if (!ownerId || !password) throw new ApiError(400, 'VALIDATION_ERROR', 'ownerId and password are required');

      const owner = await User.findByPk(ownerId);
      if (!owner || owner.role !== USER_ROLES.OWNER) throw new ApiError(404, 'NOT_FOUND', 'Owner not found');

      owner.passwordHash = await bcrypt.hash(password, 10);
      await owner.save();

      await AuditService.log({
        userId: req.user.id,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'User',
        entityId: owner.id,
        description: 'Owner password updated',
      });

      return res.json({ ok: true, data: { id: owner.id } });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { UserController };


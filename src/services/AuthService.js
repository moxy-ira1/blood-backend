const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const { sequelize, User, AuthMethod, OtpCode } = require('../models');
const { USER_ROLES, AUDIT_ACTIONS, AUTH_METHOD_TYPES } = require('../models/enums');
const { ApiError } = require('../utils/ApiError');
const { signJwtForUser } = require('../utils/jwt');
const { AuditService } = require('./AuditService');

function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

class AuthService {
  static async ownerLogin({ email, password }) {
    const user = await User.findOne({ where: { email, role: USER_ROLES.OWNER, isActive: true } });
    if (!user || !user.passwordHash) throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid credentials');

    const token = signJwtForUser(user);
    await AuditService.log({
      userId: user.id,
      action: AUDIT_ACTIONS.AUTH_LOGIN,
      entityType: 'User',
      entityId: user.id,
      description: 'Owner login',
    });

    return { token, user };
  }

  static getOtpTtlMinutes() {
    return Number(process.env.OTP_TTL_MINUTES || 10);
  }

  static async workerRequestOtp({ phone }) {
    const user = await User.findOne({ where: { phone, role: USER_ROLES.WORKER, isActive: true } });
    if (!user) throw new ApiError(404, 'NOT_FOUND', 'Worker not found');

    const otp = makeOtp();
    const codeHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + AuthService.getOtpTtlMinutes() * 60 * 1000);

    await OtpCode.create({ phone, codeHash, expiresAt, consumedAt: null });

    // In production you'd send SMS. For now we return it only in development.
    const devOtp = process.env.NODE_ENV === 'development' ? otp : undefined;
    return { devOtp, expiresAt };
  }

  static async workerVerifyOtp({ phone, otp }) {
    const user = await User.findOne({ where: { phone, role: USER_ROLES.WORKER, isActive: true } });
    if (!user) throw new ApiError(404, 'NOT_FOUND', 'Worker not found');

    const record = await OtpCode.findOne({
      where: {
        phone,
        consumedAt: null,
        expiresAt: { [Op.gt]: new Date() },
      },
      order: [['createdAt', 'DESC']],
    });
    if (!record) throw new ApiError(400, 'OTP_INVALID', 'OTP is invalid or expired');

    const ok = await bcrypt.compare(otp, record.codeHash);
    if (!ok) throw new ApiError(400, 'OTP_INVALID', 'OTP is invalid or expired');

    record.consumedAt = new Date();
    await record.save();

    const token = signJwtForUser(user);
    await AuditService.log({
      userId: user.id,
      action: AUDIT_ACTIONS.AUTH_LOGIN,
      entityType: 'User',
      entityId: user.id,
      description: 'Worker login via OTP',
    });

    return { token, user };
  }

  static async donorLoginByIdNumber({ idNumber }) {
    const authMethod = await AuthMethod.findOne({
      where: { type: AUTH_METHOD_TYPES.ID_NUMBER, identifier: idNumber },
      include: [{ model: User }],
    });
    if (!authMethod || !authMethod.User || !authMethod.User.isActive) {
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid ID number');
    }
    if (authMethod.User.role !== USER_ROLES.DONOR) throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid ID number');

    const token = signJwtForUser(authMethod.User);
    await AuditService.log({
      userId: authMethod.User.id,
      action: AUDIT_ACTIONS.AUTH_LOGIN,
      entityType: 'User',
      entityId: authMethod.User.id,
      description: 'Donor login via ID number',
    });

    return { token, user: authMethod.User };
  }

  static async createWorker({ ownerUserId, btdOrganizationId, fullName, phone }, transaction) {
    void ownerUserId;
    return User.create(
      { role: USER_ROLES.WORKER, fullName, phone, btdOrganizationId: btdOrganizationId || null },
      { transaction }
    );
  }

  static async createDonor({ createdByUserId, btdOrganizationId, fullName, idNumber, phone, email }, transaction) {
    return sequelize.transaction({ transaction }, async (t) => {
      const donor = await User.create(
        { role: USER_ROLES.DONOR, fullName, phone: phone || null, email: email || null, btdOrganizationId: btdOrganizationId || null },
        { transaction: t }
      );
      await AuthMethod.create(
        { userId: donor.id, type: AUTH_METHOD_TYPES.ID_NUMBER, identifier: idNumber },
        { transaction: t }
      );
      await AuditService.log({
        userId: createdByUserId,
        action: AUDIT_ACTIONS.UPDATE_USER,
        entityType: 'User',
        entityId: donor.id,
        description: `Donor created (${fullName})`,
        transaction: t,
      });
      return donor;
    });
  }
}

module.exports = { AuthService };


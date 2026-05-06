const { ApiError } = require('../utils/ApiError');
const { AuthService } = require('../services/AuthService');

class AuthController {
  static async ownerLogin(req, res, next) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) throw new ApiError(400, 'VALIDATION_ERROR', 'email and password are required');
      const { token, user } = await AuthService.ownerLogin({ email, password });
      return res.json({ ok: true, data: { token, user } });
    } catch (e) {
      return next(e);
    }
  }

  static async workerRequestOtp(req, res, next) {
    try {
      const { phone } = req.body || {};
      if (!phone) throw new ApiError(400, 'VALIDATION_ERROR', 'phone is required');
      const data = await AuthService.workerRequestOtp({ phone });
      return res.json({ ok: true, data });
    } catch (e) {
      return next(e);
    }
  }

  static async workerVerifyOtp(req, res, next) {
    try {
      const { phone, otp } = req.body || {};
      if (!phone || !otp) throw new ApiError(400, 'VALIDATION_ERROR', 'phone and otp are required');
      const { token, user } = await AuthService.workerVerifyOtp({ phone, otp });
      return res.json({ ok: true, data: { token, user } });
    } catch (e) {
      return next(e);
    }
  }

  static async donorLogin(req, res, next) {
    try {
      const { idNumber } = req.body || {};
      if (!idNumber) throw new ApiError(400, 'VALIDATION_ERROR', 'idNumber is required');
      const { token, user } = await AuthService.donorLoginByIdNumber({ idNumber });
      return res.json({ ok: true, data: { token, user } });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { AuthController };


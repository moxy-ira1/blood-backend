const { AuditLog } = require('../models');

class AuditController {
  static async list(req, res, next) {
    try {
      const logs = await AuditLog.findAll({ order: [['timestamp', 'DESC']], limit: 200 });
      return res.json({ ok: true, data: logs });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { AuditController };


const { AuditLog } = require('../models');

class AuditService {
  static async log({ userId, action, entityType, entityId, description, transaction }) {
    return AuditLog.create(
      {
        userId: userId || null,
        action,
        entityType,
        entityId: entityId || null,
        description,
        timestamp: new Date(),
      },
      { transaction }
    );
  }
}

module.exports = { AuditService };


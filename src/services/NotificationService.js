const { Notification } = require('../models');

class NotificationService {
  static async create({ userId, title, message, type }, transaction) {
    return Notification.create(
      { userId, title, message, type, isRead: false },
      { transaction }
    );
  }
}

module.exports = { NotificationService };


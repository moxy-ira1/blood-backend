const { Notification } = require('../models');

class NotificationController {
  static async myNotifications(req, res, next) {
    try {
      const items = await Notification.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
      });
      return res.json({ ok: true, data: items });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { NotificationController };


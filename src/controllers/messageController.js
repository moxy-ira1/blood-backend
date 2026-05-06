const { ApiError } = require('../utils/ApiError');
const { MessageService } = require('../services/MessageService');

class MessageController {
  static async send(req, res, next) {
    try {
      const { recipientId, body } = req.body || {};
      if (!recipientId) throw new ApiError(400, 'VALIDATION_ERROR', 'recipientId is required');
      if (!body) throw new ApiError(400, 'VALIDATION_ERROR', 'body is required');
      const msg = await MessageService.sendMessage({ senderId: req.user.id, recipientId, body });
      return res.status(201).json({ ok: true, data: msg });
    } catch (e) {
      return next(e);
    }
  }

  static async listMessages(req, res, next) {
    try {
      const { conversationId } = req.params;
      const msgs = await MessageService.listConversationMessages({ userId: req.user.id, conversationId });
      return res.json({ ok: true, data: msgs });
    } catch (e) {
      return next(e);
    }
  }

  static async markRead(req, res, next) {
    try {
      const { conversationId } = req.params;
      const result = await MessageService.markConversationRead({ userId: req.user.id, conversationId });
      return res.json({ ok: true, data: result });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = { MessageController };


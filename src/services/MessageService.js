const { Op } = require('sequelize');
const { sequelize, Conversation, Message, User } = require('../models');
const { ApiError } = require('../utils/ApiError');
const { AUDIT_ACTIONS } = require('../models/enums');
const { AuditService } = require('./AuditService');

function normalizePair(a, b) {
  return a < b ? [a, b] : [b, a];
}

class MessageService {
  static async getOrCreateConversation(userAId, userBId, transaction) {
    const [participantAId, participantBId] = normalizePair(userAId, userBId);

    let convo = await Conversation.findOne({
      where: { participantAId, participantBId },
      transaction,
    });
    if (!convo) {
      convo = await Conversation.create({ participantAId, participantBId, lastMessageAt: null }, { transaction });
    }
    return convo;
  }

  static async sendMessage({ senderId, recipientId, body }) {
    return sequelize.transaction(async (t) => {
      const sender = await User.findByPk(senderId, { transaction: t });
      const recipient = await User.findByPk(recipientId, { transaction: t });
      if (!sender || !recipient) throw new ApiError(404, 'NOT_FOUND', 'User not found');
      if (!body || !String(body).trim()) throw new ApiError(400, 'VALIDATION_ERROR', 'Message body is required');

      const convo = await MessageService.getOrCreateConversation(senderId, recipientId, t);
      const msg = await Message.create(
        {
          conversationId: convo.id,
          senderId,
          recipientId,
          body: String(body),
          readAt: null,
        },
        { transaction: t }
      );
      convo.lastMessageAt = msg.createdAt;
      await convo.save({ transaction: t });

      await AuditService.log({
        userId: senderId,
        action: AUDIT_ACTIONS.SEND_MESSAGE,
        entityType: 'Message',
        entityId: msg.id,
        description: `Message sent to ${recipientId}`,
        transaction: t,
      });

      return msg;
    });
  }

  static async listConversationMessages({ userId, conversationId }) {
    const convo = await Conversation.findByPk(conversationId);
    if (!convo) throw new ApiError(404, 'NOT_FOUND', 'Conversation not found');
    if (![convo.participantAId, convo.participantBId].includes(userId)) {
      throw new ApiError(403, 'FORBIDDEN', 'Not allowed');
    }

    return Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
    });
  }

  static async markConversationRead({ userId, conversationId }) {
    const convo = await Conversation.findByPk(conversationId);
    if (!convo) throw new ApiError(404, 'NOT_FOUND', 'Conversation not found');
    if (![convo.participantAId, convo.participantBId].includes(userId)) {
      throw new ApiError(403, 'FORBIDDEN', 'Not allowed');
    }

    const now = new Date();
    const [count] = await Message.update(
      { readAt: now },
      {
        where: {
          conversationId,
          recipientId: userId,
          readAt: { [Op.is]: null },
        },
      }
    );
    return { updated: count };
  }
}

module.exports = { MessageService };


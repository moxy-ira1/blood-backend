const { DataTypes } = require('sequelize');

function MessageModel(sequelize) {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'messages',
      indexes: [
        { fields: ['conversation_id'] },
        { fields: ['sender_id'] },
        { fields: ['recipient_id'] },
        { fields: ['created_at'] },
      ],
    }
  );

  return { Message };
}

module.exports = MessageModel;


const { DataTypes } = require('sequelize');

function ConversationModel(sequelize) {
  const Conversation = sequelize.define(
    'Conversation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      participantAId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      participantBId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      lastMessageAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'conversations',
      indexes: [
        { fields: ['participant_a_id'] },
        { fields: ['participant_b_id'] },
        { unique: true, fields: ['participant_a_id', 'participant_b_id'] },
      ],
    }
  );

  return { Conversation };
}

module.exports = ConversationModel;


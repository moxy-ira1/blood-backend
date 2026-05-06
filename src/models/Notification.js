const { DataTypes } = require('sequelize');

function NotificationModel(sequelize) {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'notifications',
      indexes: [{ fields: ['user_id'] }, { fields: ['is_read'] }, { fields: ['created_at'] }],
    }
  );

  return { Notification };
}

module.exports = NotificationModel;


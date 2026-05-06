const { DataTypes } = require('sequelize');
const { AUDIT_ACTIONS } = require('./enums');

function AuditLogModel(sequelize) {
  const AuditLog = sequelize.define(
    'AuditLog',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      action: {
        type: DataTypes.ENUM(...Object.values(AUDIT_ACTIONS)),
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'audit_logs',
      createdAt: false,
      updatedAt: false,
      indexes: [{ fields: ['user_id'] }, { fields: ['action'] }, { fields: ['timestamp'] }],
    }
  );

  return { AuditLog };
}

module.exports = AuditLogModel;


const { DataTypes } = require('sequelize');
const { AUTH_METHOD_TYPES } = require('./enums');

function AuthMethodModel(sequelize) {
  const AuthMethod = sequelize.define(
    'AuthMethod',
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
      type: {
        type: DataTypes.ENUM(...Object.values(AUTH_METHOD_TYPES)),
        allowNull: false,
      },
      identifier: {
        // e.g. National ID number for donors
        type: DataTypes.STRING(64),
        allowNull: false,
      },
    },
    {
      tableName: 'auth_methods',
      indexes: [{ unique: true, fields: ['type', 'identifier'] }],
    }
  );

  return { AuthMethod };
}

module.exports = AuthMethodModel;


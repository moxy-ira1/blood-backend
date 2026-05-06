const { DataTypes } = require('sequelize');
const { USER_ROLES, ELIGIBILITY } = require('./enums');

function UserModel(sequelize) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(USER_ROLES)),
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: true,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: true,
      },
      passwordHash: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      eligibilityStatus: {
        type: DataTypes.ENUM(...Object.values(ELIGIBILITY)),
        allowNull: false,
        defaultValue: ELIGIBILITY.ELIGIBLE,
      },
      lastDonationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      btdOrganizationId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
      indexes: [
        { fields: ['role'] },
        { fields: ['btd_organization_id'] },
      ],
    }
  );

  return { User };
}

module.exports = UserModel;


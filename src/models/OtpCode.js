const { DataTypes } = require('sequelize');

function OtpCodeModel(sequelize) {
  const OtpCode = sequelize.define(
    'OtpCode',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      codeHash: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      consumedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'otp_codes',
      indexes: [{ fields: ['phone'] }, { fields: ['expires_at'] }],
    }
  );

  return { OtpCode };
}

module.exports = OtpCodeModel;


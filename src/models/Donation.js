const { DataTypes } = require('sequelize');

function DonationModel(sequelize) {
  const Donation = sequelize.define(
    'Donation',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      donorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      workerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      bloodType: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      quantityML: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      donatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'donations',
      indexes: [{ fields: ['donor_id'] }, { fields: ['donated_at'] }],
    }
  );

  return { Donation };
}

module.exports = DonationModel;


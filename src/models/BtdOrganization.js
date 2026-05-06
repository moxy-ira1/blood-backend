const { DataTypes } = require('sequelize');

function BtdOrganizationModel(sequelize) {
  const BtdOrganization = sequelize.define(
    'BtdOrganization',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    { tableName: 'btd_organizations' }
  );

  return { BtdOrganization };
}

module.exports = BtdOrganizationModel;


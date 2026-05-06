const { DataTypes } = require('sequelize');
const { INVENTORY_STATUS } = require('./enums');

function InventoryUnitModel(sequelize) {
  const InventoryUnit = sequelize.define(
    'InventoryUnit',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      donationId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      bloodType: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      quantityML: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(INVENTORY_STATUS)),
        allowNull: false,
        defaultValue: INVENTORY_STATUS.AVAILABLE,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'inventory_units',
      indexes: [{ fields: ['status'] }, { fields: ['expiry_date'] }, { fields: ['blood_type'] }],
    }
  );

  return { InventoryUnit };
}

module.exports = InventoryUnitModel;


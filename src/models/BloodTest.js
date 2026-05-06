const { DataTypes } = require('sequelize');

function BloodTestModel(sequelize) {
  const BloodTest = sequelize.define(
    'BloodTest',
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
      hivPositive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hepatitisBPositive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hepatitisCPositive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      malariaPositive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      hemoglobin: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
    },
    {
      tableName: 'blood_tests',
      indexes: [{ fields: ['donor_id'] }, { fields: ['worker_id'] }, { fields: ['created_at'] }],
    }
  );

  return { BloodTest };
}

module.exports = BloodTestModel;


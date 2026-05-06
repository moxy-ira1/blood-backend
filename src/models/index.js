const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DATABASE_URL, NODE_ENV } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres", // ✅ FIXED (was 'postgress')
  protocol: "postgres",
  logging: NODE_ENV === "development" ? console.log : false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ✅ REQUIRED for Render
    },
  },

  define: {
    underscored: true,
  },
  logging: false,
});

const { User } = require('./User')(sequelize);
const { BtdOrganization } = require('./BtdOrganization')(sequelize);
const { AuthMethod } = require('./AuthMethod')(sequelize);
const { OtpCode } = require('./OtpCode')(sequelize);
const { BloodTest } = require('./BloodTest')(sequelize);
const { Donation } = require('./Donation')(sequelize);
const { InventoryUnit } = require('./InventoryUnit')(sequelize);
const { Conversation } = require('./Conversation')(sequelize);
const { Message } = require('./Message')(sequelize);
const { Notification } = require('./Notification')(sequelize);
const { AuditLog } = require('./AuditLog')(sequelize);

// Associations
BtdOrganization.hasMany(User, { foreignKey: { name: 'btdOrganizationId', allowNull: true } });
User.belongsTo(BtdOrganization, { foreignKey: { name: 'btdOrganizationId', allowNull: true } });

User.hasMany(AuthMethod, { foreignKey: { name: 'userId', allowNull: false } });
AuthMethod.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

User.hasMany(BloodTest, { foreignKey: { name: 'donorId', allowNull: false }, as: 'donorBloodTests' });
BloodTest.belongsTo(User, { foreignKey: { name: 'donorId', allowNull: false }, as: 'donor' });
User.hasMany(BloodTest, { foreignKey: { name: 'workerId', allowNull: false }, as: 'workerBloodTests' });
BloodTest.belongsTo(User, { foreignKey: { name: 'workerId', allowNull: false }, as: 'worker' });

User.hasMany(Donation, { foreignKey: { name: 'donorId', allowNull: false }, as: 'donorDonations' });
Donation.belongsTo(User, { foreignKey: { name: 'donorId', allowNull: false }, as: 'donor' });
User.hasMany(Donation, { foreignKey: { name: 'workerId', allowNull: false }, as: 'workerDonations' });
Donation.belongsTo(User, { foreignKey: { name: 'workerId', allowNull: false }, as: 'worker' });

Donation.hasOne(InventoryUnit, { foreignKey: { name: 'donationId', allowNull: false } });
InventoryUnit.belongsTo(Donation, { foreignKey: { name: 'donationId', allowNull: false } });

Conversation.belongsTo(User, { foreignKey: { name: 'participantAId', allowNull: false }, as: 'participantA' });
Conversation.belongsTo(User, { foreignKey: { name: 'participantBId', allowNull: false }, as: 'participantB' });
Conversation.hasMany(Message, { foreignKey: { name: 'conversationId', allowNull: false } });
Message.belongsTo(Conversation, { foreignKey: { name: 'conversationId', allowNull: false } });

Message.belongsTo(User, { foreignKey: { name: 'senderId', allowNull: false }, as: 'sender' });
Message.belongsTo(User, { foreignKey: { name: 'recipientId', allowNull: false }, as: 'recipient' });

User.hasMany(Notification, { foreignKey: { name: 'userId', allowNull: false } });
Notification.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

User.hasMany(AuditLog, { foreignKey: { name: 'userId', allowNull: true } });
AuditLog.belongsTo(User, { foreignKey: { name: 'userId', allowNull: true } });

module.exports = {
  sequelize,
  Sequelize,
  User,
  BtdOrganization,
  AuthMethod,
  OtpCode,
  BloodTest,
  Donation,
  InventoryUnit,
  Conversation,
  Message,
  Notification,
  AuditLog,
};


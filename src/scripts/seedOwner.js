require('dotenv').config();

const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models');
const { USER_ROLES } = require('../models/enums');

async function main() {
  const email = process.env.OWNER_EMAIL || 'owner@example.com';
  const password = process.env.OWNER_PASSWORD || 'ChangeMe123!';
  const fullName = process.env.OWNER_NAME || 'BTD Owner';

  await sequelize.authenticate();
  await sequelize.sync();

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    console.log('Owner already exists:', existing.id);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const owner = await User.create({
    role: USER_ROLES.OWNER,
    fullName,
    email,
    passwordHash,
  });

  console.log('Seeded owner:', owner.id, email);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });


const { createApp } = require('../app');
const { sequelize } = require('../models');
const { startInventoryExpiryJob } = require('./jobs/inventoryExpiryJob');

async function startApp() {
  const app = createApp();

  await sequelize.authenticate();
  await sequelize.sync();

  startInventoryExpiryJob();

  const port = Number(process.env.PORT || 4000);
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`API listening on port  http://localhost:${port}`);
      resolve(app);
    });
  });
}

module.exports = { startApp };


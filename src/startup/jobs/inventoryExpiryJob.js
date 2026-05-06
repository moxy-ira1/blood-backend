const cron = require('node-cron');
const { InventoryService } = require('../../services/InventoryService');

function startInventoryExpiryJob() {
  // Every day at 01:05
  cron.schedule('5 1 * * *', async () => {
    try {
      await InventoryService.markExpiredUnits();
    } catch (e) {
      console.error('inventoryExpiryJob error', e);
    }
  });
}

module.exports = { startInventoryExpiryJob };


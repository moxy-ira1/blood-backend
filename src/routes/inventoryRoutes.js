const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { InventoryController } = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER), InventoryController.list);
router.post('/:unitId/discard', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER), InventoryController.discard);
router.post('/:unitId/use', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER), InventoryController.use);
router.post('/mark-expired', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER), InventoryController.markExpired);

module.exports = router;


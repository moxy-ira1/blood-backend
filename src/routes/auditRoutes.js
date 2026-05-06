const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { AuditController } = require('../controllers/auditController');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.OWNER), AuditController.list);

module.exports = router;


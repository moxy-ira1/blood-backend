const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { OrganizationController } = require('../controllers/organizationController');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.OWNER), OrganizationController.list);
router.post('/', authMiddleware, roleMiddleware(USER_ROLES.OWNER), OrganizationController.create);
router.patch('/:orgId', authMiddleware, roleMiddleware(USER_ROLES.OWNER), OrganizationController.update);
router.delete('/:orgId', authMiddleware, roleMiddleware(USER_ROLES.OWNER), OrganizationController.remove);

module.exports = router;


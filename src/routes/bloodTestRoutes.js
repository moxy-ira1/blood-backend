const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { BloodTestController } = require('../controllers/bloodTestController');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(USER_ROLES.WORKER), BloodTestController.create);

module.exports = router;


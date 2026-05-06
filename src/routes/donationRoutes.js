const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { DonationController } = require('../controllers/donationController');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(USER_ROLES.WORKER), DonationController.create);

module.exports = router;


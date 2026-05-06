const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const { USER_ROLES } = require('../models/enums');
const { UserController } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authMiddleware, UserController.me);

router.get('/', authMiddleware, roleMiddleware(USER_ROLES.OWNER), UserController.listUsers);
router.post('/workers', authMiddleware, roleMiddleware(USER_ROLES.OWNER), UserController.createWorker);
router.post('/donors', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER), UserController.createDonor);
router.post('/owners/set-password', authMiddleware, roleMiddleware(USER_ROLES.OWNER), UserController.setOwnerPassword);
router.patch('/:userId/assign-organization', authMiddleware, roleMiddleware(USER_ROLES.OWNER), UserController.assignToOrganization);

router.get('/donors/:donorId/donations', authMiddleware, roleMiddleware(USER_ROLES.OWNER, USER_ROLES.WORKER, USER_ROLES.DONOR), UserController.donationHistory);
router.get('/my/donations', authMiddleware, roleMiddleware(USER_ROLES.DONOR), UserController.donationHistory);

module.exports = router;


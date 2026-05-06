const express = require('express');
const { AuthController } = require('../controllers/authController');

const router = express.Router();

router.post('/owner/login', AuthController.ownerLogin);
router.post('/worker/request-otp', AuthController.workerRequestOtp);
router.post('/worker/verify-otp', AuthController.workerVerifyOtp);
router.post('/donor/login', AuthController.donorLogin);

module.exports = router;


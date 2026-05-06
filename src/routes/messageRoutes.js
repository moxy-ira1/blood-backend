const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { MessageController } = require('../controllers/messageController');

const router = express.Router();

router.post('/', authMiddleware, MessageController.send);
router.get('/conversations/:conversationId', authMiddleware, MessageController.listMessages);
router.post('/conversations/:conversationId/read', authMiddleware, MessageController.markRead);

module.exports = router;


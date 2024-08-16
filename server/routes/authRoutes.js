const express = require('express');
const { register, login, settings, editSettings } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/settings', authenticateToken, settings);
router.put('/settings', authenticateToken, editSettings);

module.exports = router;

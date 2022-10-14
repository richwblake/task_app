const express = require('express');
const router = express.Router();
const { login, check } = require('../controllers/sessionController');
const { authenticate, addHeaders } = require('../middleware/auth');

router.post('/login', login);
router.get('/check', authenticate, check);

module.exports = router;

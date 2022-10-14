const express = require('express');
const router = express.Router();
const { getTasks } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getTasks);

module.exports = router;

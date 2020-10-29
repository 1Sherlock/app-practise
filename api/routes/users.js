const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/users');

router.post('/login', UserController.user_login);
router.get('/me', checkAuth, UserController.me);

//router.post('/signup', UserController.user_signup);

module.exports = router;
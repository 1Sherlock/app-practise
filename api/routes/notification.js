const express = require('express');
const router = express.Router();
const Controller = require('../controllers/notification');

router.get('/dbVersion', Controller.getDbVersion);

router.get('/:version', Controller.getByVersion);

module.exports = router
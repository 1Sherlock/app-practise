const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const SmsController = require('../controllers/sms');

router.get('/', SmsController.get_all);

router.get('/:id',SmsController.get_all_by_category);

router.post('/', checkAuth, SmsController.create);

router.post('/update/:id', checkAuth,SmsController.update);

router.post('/delete/:id',checkAuth, SmsController.delete);

router.get('/byId/:id', SmsController.getById);
module.exports = router
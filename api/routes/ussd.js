const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const UssdController = require('../controllers/ussd');

router.get('/', UssdController.get_all);

router.get('/:id', UssdController.get_all_by_operator);

router.post('/', checkAuth, UssdController.create);

router.post('/update/:id', checkAuth, UssdController.update);

router.post('/delete/:id', checkAuth, UssdController.delete);

router.get('/byId/:id', UssdController.getById);
module.exports = router
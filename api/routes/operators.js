const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OperatorController = require('../controllers/operators');

router.get('/', OperatorController.get_all);

router.post('/', checkAuth, OperatorController.create);

router.post('/update/:id', checkAuth, OperatorController.update);

router.post('/delete/:id', checkAuth, OperatorController.delete);

router.get('/byId/:id', OperatorController.getById);
module.exports = router;
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ServiceController = require('../controllers/service');

router.get('/', ServiceController.get_all);

router.get('/:id',ServiceController.get_all_by_category);

router.post('/', checkAuth, ServiceController.create);

router.post('/update/:id', checkAuth,ServiceController.update);

router.post('/delete/:id',checkAuth, ServiceController.delete);

router.get('/byId/:id', ServiceController.getById);
module.exports = router
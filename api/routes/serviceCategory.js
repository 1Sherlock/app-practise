const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ServiceCategoryController = require('../controllers/serviceCategory');

router.get('/', ServiceCategoryController.get_all);

router.get('/:id',ServiceCategoryController.get_all_by_operator);

router.post('/', checkAuth, ServiceCategoryController.create);

router.post('/update/:id', checkAuth,ServiceCategoryController.update);

router.post('/delete/:id',checkAuth, ServiceCategoryController.delete);

router.get('/byId/:id', ServiceCategoryController.getById);
module.exports = router
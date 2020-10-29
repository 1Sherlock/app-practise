const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const NetworkCategoryController = require('../controllers/networkCategory');

router.get('/', NetworkCategoryController.get_all);

router.get('/:id',NetworkCategoryController.get_all_by_operator);

router.post('/', checkAuth, NetworkCategoryController.create);

router.post('/update/:id', checkAuth,NetworkCategoryController.update);

router.post('/delete/:id',checkAuth, NetworkCategoryController.delete);

router.get('/byId/:id', NetworkCategoryController.getById);
module.exports = router
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const CategoryController = require('../controllers/tarifCategory');

router.get('/', CategoryController.get_all);

router.get('/:id',CategoryController.get_all_by_operator);

router.post('/', checkAuth, CategoryController.create);

router.post('/update/:id', checkAuth,CategoryController.update);

router.post('/delete/:id',checkAuth, CategoryController.delete);

router.get('/byId/:id', CategoryController.getById);
module.exports = router
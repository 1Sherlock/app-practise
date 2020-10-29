const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const SmsCategoryController = require('../controllers/smsCategory');

router.get('/', SmsCategoryController.get_all);

router.get('/:id',SmsCategoryController.get_all_by_operator);

router.post('/', checkAuth, SmsCategoryController.create);

router.post('/update/:id', checkAuth,SmsCategoryController.update);

router.post('/delete/:id',checkAuth, SmsCategoryController.delete);

router.get('/byId/:id', SmsCategoryController.getById);
module.exports = router
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DaqiqaCategoryController = require('../controllers/daqiqaCategory');

router.get('/', DaqiqaCategoryController.get_all);

router.get('/:id',DaqiqaCategoryController.get_all_by_operator);

router.post('/', checkAuth, DaqiqaCategoryController.create);

router.post('/update/:id', checkAuth,DaqiqaCategoryController.update);

router.post('/delete/:id',checkAuth, DaqiqaCategoryController.delete);

router.get('/byId/:id', DaqiqaCategoryController.getById);
module.exports = router
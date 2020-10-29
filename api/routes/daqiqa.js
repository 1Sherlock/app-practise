const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const DaqiqaController = require('../controllers/daqiqa');

router.get('/', DaqiqaController.get_all);

router.get('/:id',DaqiqaController.get_all_by_category);

router.post('/', checkAuth, DaqiqaController.create);

router.post('/update/:id', checkAuth,DaqiqaController.update);

router.post('/delete/:id',checkAuth, DaqiqaController.delete);

router.get('/byId/:id', DaqiqaController.getById);
module.exports = router
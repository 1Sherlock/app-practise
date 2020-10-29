const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const NetworkController = require('../controllers/network');

router.get('/', NetworkController.get_all);

router.get('/:id',NetworkController.get_all_by_category);

router.post('/', checkAuth, NetworkController.create);

router.post('/update/:id', checkAuth,NetworkController.update);

router.post('/delete/:id',checkAuth, NetworkController.delete);
router.get('/byId/:id', NetworkController.getById);
module.exports = router
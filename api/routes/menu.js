const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const MenuController = require('../controllers/menu');

router.get('/', MenuController.get_all);

router.post('/update/:id', checkAuth,MenuController.update);
router.get('/byId/:id', MenuController.getById);
module.exports = router
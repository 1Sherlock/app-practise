const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ContactController = require('../controllers/contact');

router.get('/', ContactController.get_all);

router.get('/:id', ContactController.get_all_by_operator);

router.get('/byId/:id', ContactController.getById);

router.post('/', checkAuth, ContactController.create);

router.post('/update/:id', checkAuth, ContactController.update);

router.post('/delete/:id', checkAuth, ContactController.delete);

module.exports = router
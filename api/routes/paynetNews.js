const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PaynetNewsController = require('../controllers/paynetNews');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1 //1Mb gacha yuklash mumkin
    },
    fileFilter: fileFilter
});

router.get('/', PaynetNewsController.get_all);

router.post('/', checkAuth, upload.single('image'), PaynetNewsController.create);


router.post('/update/:id', upload.single('image'), checkAuth, PaynetNewsController.update);

router.post('/delete/:id', checkAuth, PaynetNewsController.delete);

router.get('/byId/:id', PaynetNewsController.getById);

router.get('/updateViewCount/:id', PaynetNewsController.updateViewCount);

module.exports = router;
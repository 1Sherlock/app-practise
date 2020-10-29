const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const NewsController = require('../controllers/news');
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
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1 //1Mb gacha yuklash mumkin
    },
    fileFilter: fileFilter
});

router.get('/', NewsController.get_all);

router.post('/', checkAuth, upload.single('image'), NewsController.create);

router.get('/byCompany/:company', NewsController.get_all_by_company);

router.post('/update/:id', upload.single('image'), checkAuth, NewsController.update);

router.post('/delete/:id', checkAuth, NewsController.delete);

router.get('/byId/:id', NewsController.getById);

router.get('/news3', NewsController.get3News);

router.get('/updateViewCount/:id', NewsController.updateViewCount);

module.exports = router;
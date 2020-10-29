const Slider = require('../model/slider');

exports.getAll = async (req, res, next) => {
    try {
        const list = await Slider.findAll({order: [['order', 'ASC']]})
        res.status(200).json({list: list});
    } catch (e) {
        res.status(500).json({
            error: e
        });

    }
};

exports.save = async (req, res, next) => {
    const {order, url} = req.body;
    if (req.file && req.body.order) {
        const slider = new Slider({order, url, image: req.file.path});
        try {
            const r = await slider.save();
            res.status(200).json(r);
        } catch (e) {
            res.status(500).json({error: e})
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        const {order, url} = req.body;
        try {
            const slider = await Slider.findByPk(id);
            const r = await slider.update({
                order, url, image: (req.file ? req.file.path : slider.image)
            });
            res.status(200).json(r);
        } catch (e) {
            res.status(500).json({error: e})
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
};

exports.delete = async (req, res, next) => {
    try {
        const item = await Slider.findByPk(req.params.id);
        await item.destroy();
        res.status(200).json({success: true, message: "Deleted"})
    } catch (e) {
        res.status(500).json({error: e});
    }
}
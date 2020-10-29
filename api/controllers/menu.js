const Menu = require("../model/menu");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await Menu.findAll();
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await Menu.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
const table = 'menu';
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    try {
        let menu = await Menu.findByPk(id);
        menu = await menu.update({...menu, ...body})
        messaging.sendMessage('update', menu.id, table);
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({error: err})
    }
}
const NetworkCategory = require("../model/networkCategory");
const Network = require("../model/network");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await NetworkCategory.findAll();
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await NetworkCategory.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.get_all_by_operator = async (req, res, next) => {
    try {
        const docs = await NetworkCategory.findAll({where: {operator: req.params.id}, order: [['order', 'ASC']]});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
const table = 'networkCategory';
exports.create = async (req, res, next) => {
    const {name, nameRu, nameKr, info, infoRu, infoKr, order, operator} = req.body;
    if (name && nameRu && nameKr && info && infoRu && infoKr && order && operator) {
        const ussd = new NetworkCategory({name, nameRu, nameKr, info, infoRu, infoKr, order, operator});
        try {
            const result = await ussd.save();
            messaging.sendMessage('insert', result.id, table);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({error: err});
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {name, nameRu, nameKr, info, infoRu, infoKr, order, operator} = req.body;
    if (name && nameRu && nameKr && info && infoRu && infoKr && order && operator) {
        try {
            let ussd = await NetworkCategory.findByPk(id);
            ussd = await ussd.update({name, nameRu, nameKr, info, infoRu, infoKr, order, operator})
            messaging.sendMessage('update', ussd.id, table);
            res.status(200).json(ussd);
        } catch (err) {
            res.status(500).json({error: err})
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}

exports.delete = async (req, res, next) => {
    try {
        let ussd = await NetworkCategory.findByPk(req.params.id)
        const id = ussd.id;
        ussd = await ussd.destroy();
        messaging.sendMessage('delete', id, table);
        Network.destroy({where: {category: req.params.id}});
        res.status(200).json({success: true, message: "Deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
}
const SmsCategory = require("../model/smsCategory");
const Sms = require("../model/sms");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await SmsCategory.findAll();
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await SmsCategory.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.get_all_by_operator = async (req, res, next) => {
    try {
        const docs = await SmsCategory.findAll({where: {operator: req.params.id}, order: [['order', 'ASC']]});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
const table = 'smsCategory';
exports.create = async (req, res, next) => {
    const {name, nameRu, nameKr, info, infoRu, infoKr, order, operator} = req.body;
    if (name && nameRu && nameKr && info && infoRu && infoKr && order && operator) {
        const ussd = new SmsCategory({name, nameRu, nameKr, info, infoRu, infoKr, order, operator});
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
            let ussd = await SmsCategory.findByPk(id);
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
        let ussd = await SmsCategory.findByPk(req.params.id);
        const id = ussd.id;
        ussd = await ussd.destroy();
        messaging.sendMessage('delete', id, table);
        Sms.destroy({where: {category: req.params.id}});
        res.status(200).json({success: true, message: "Deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
}
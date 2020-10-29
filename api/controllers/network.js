const Network = require("../model/network");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await Network.findAll();
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await Network.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.get_all_by_category = async (req, res, next) => {
    try {
        const docs = await Network.findAll({where: {category: req.params.id}, order: [['order', 'ASC']]});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
const table = 'network';
exports.create = async (req, res, next) => {
    const {
        name, nameRu, nameKr, price, priceRu, priceKr, hajmi, hajmiRu, hajmiKr, muddat, muddatRu, muddatKr, description, descriptionRu, descriptionKr,
        ussdCode, order, operator, category
    } = req.body;
    if (name && nameRu && nameKr && price && priceRu && priceKr && hajmi && hajmiRu && hajmiKr && muddat && muddatRu && muddatKr &&
        description && descriptionRu && descriptionKr && ussdCode && order && operator && category) {
        const ussd = new Network({
            name, nameRu, nameKr, price, priceRu, priceKr, hajmi, hajmiRu, hajmiKr, muddat, muddatRu, muddatKr,
            description, descriptionRu, descriptionKr, ussdCode, order, operator, category
        });
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
    const {
        name, nameRu, nameKr, price, priceRu, priceKr, hajmi, hajmiRu, hajmiKr, muddat, muddatRu, muddatKr, description, descriptionRu, descriptionKr,
        ussdCode, order, operator, category
    } = req.body;
    if (name && nameRu && nameKr && price && priceRu && priceKr && hajmi && hajmiRu && hajmiKr && muddat && muddatRu && muddatKr &&
        description && descriptionRu && descriptionKr && ussdCode && order && operator && category) {
        try {
            let ussd = await Network.findByPk(id);
            ussd = await ussd.update({
                name, nameRu, nameKr, price, priceRu, priceKr, hajmi, hajmiRu, hajmiKr, muddat, muddatRu, muddatKr,
                description, descriptionRu, descriptionKr, ussdCode, order, operator, category
            })
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
        let ussd = await Network.findByPk(req.params.id)
        const id = ussd.id;
        ussd = await ussd.destroy();
        messaging.sendMessage('delete', id, table);
        res.status(200).json({success: true, message: "Deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
}
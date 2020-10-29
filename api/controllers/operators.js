const Operator = require("../model/operator");
const messaging = require("./messaging");

exports.get_all = async (req, res, next) => {
    try {
        const docs = await Operator.findAll({order: [['id', 'ASC']]});
        res.status(200).json({list: docs});
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.getById = async (req, res, next) => {
    try {
        const item = await Operator.findByPk(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}
exports.create = async (req, res, next) => {
    const {name, description, descriptionRu, descriptionKr, balansUssd, networkUssd, daqiqaUssd, smsUssd, cabinet, operatorNumber} = req.body;
    if (name && description && descriptionRu && descriptionKr && balansUssd && networkUssd && daqiqaUssd && smsUssd && cabinet && operatorNumber) {
        const operator = new Operator({
            name,
            cabinet,
            description,
            descriptionRu,
            descriptionKr,
            balansUssd,
            networkUssd,
            daqiqaUssd,
            smsUssd,
            operatorNumber
        });
        try {
            const result = await operator.save();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({error: err});
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}
const table = 'operator';
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const {name, description, descriptionRu, descriptionKr, balansUssd, networkUssd, daqiqaUssd, smsUssd, cabinet, operatorNumber} = req.body;
    if (name && description && descriptionRu && descriptionKr && balansUssd && networkUssd && daqiqaUssd && smsUssd && cabinet && operatorNumber) {
        try {
            let operator = await Operator.findByPk(id);
            operator = await operator.update({
                name,
                cabinet,
                description,
                descriptionRu,
                descriptionKr,
                balansUssd,
                networkUssd,
                daqiqaUssd,
                smsUssd,
                operatorNumber
            });
            messaging.sendMessage('update', operator.id, table);
            res.status(200).json(operator);
        } catch (err) {
            res.status(500).json({error: err})
        }
    } else {
        res.status(500).json({error: "Ma'lumotlar to'liq to'ldirilmagan!"});
    }
}

exports.delete = async (req, res, next) => {
    try {
        let operator = await Operator.findByPk(req.params.id)
        operator = await operator.destroy();
        res.status(200).json({success:true,message:"Deleted"});
    } catch (err) {
        res.status(500).json({ error: err });
    }

    // res.status(500).json({error: 'error'})
}
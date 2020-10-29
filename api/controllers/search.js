const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Network = require("../model/network");
const Ussd = require("../model/ussd");
const Tarif = require("../model/tarif");
const Service = require("../model/service");
const Daqiqa = require("../model/daqiqa");
const Sms = require("../model/sms");

exports.search = async (req, res, next) => {
    const search = req.query.search;
    if (!search) {
        res.status(500).json({error: 'Xatolik!'})
    }
    const operator = req.query.operator;
    try {
        let networkCondition = {
            [Op.or]: [
                {name: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {price: {[Op.like]: `%${search.toUpperCase()}%`}},
                {priceRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {priceKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {hajmi: {[Op.like]: `%${search.toUpperCase()}%`}},
                {hajmiRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {hajmiKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {muddat: {[Op.like]: `%${search.toUpperCase()}%`}},
                {muddatRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {muddatKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {description: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {ussdCode: {[Op.like]: `%${search.toUpperCase()}%`}}
            ],
        };
        let ussdCondition = {
            [Op.or]: [
                {name: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {ussdCode: {[Op.like]: `%${search.toUpperCase()}%`}}
            ],
        };
        let tarifCondition = {
            [Op.or]: [
                {name: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {batafsil: {[Op.like]: `%${search.toUpperCase()}%`}},
                {batafsilRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {batafsilKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {description: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {ussdCode: {[Op.like]: `%${search.toUpperCase()}%`}}
            ],
        };
        let serviceCondition = {
            [Op.or]: [
                {name: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {nameKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {description: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionRu: {[Op.like]: `%${search.toUpperCase()}%`}},
                {descriptionKr: {[Op.like]: `%${search.toUpperCase()}%`}},
                {ussdCode: {[Op.like]: `%${search.toUpperCase()}%`}}
            ],
        };
        if (operator) {
            networkCondition.operator = operator;
            ussdCondition.operator = operator;
            tarifCondition.operator = operator;
            serviceCondition.operator = operator;
        }

        const networks = await Network.findAll({
            where: networkCondition
        });

        const ussds = await Ussd.findAll({
            where: ussdCondition
        });

        const tarifs = await Tarif.findAll({
            where: tarifCondition
        });

        const services = await Service.findAll({
            where: serviceCondition
        });

        const daqiqa = await Daqiqa.findAll({
            where: serviceCondition
        });

        const sms = await Sms.findAll({
            where: serviceCondition
        });

        res.json({list: {networks, ussds, tarifs, services, daqiqa, sms}});
    } catch (e) {
        res.status(500).json({error: e})
    }
}
;
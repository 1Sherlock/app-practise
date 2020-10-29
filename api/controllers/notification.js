const Notification = require("../model/notification");
const DatabaseVersion = require("../model/databaseVersion");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getDbVersion = async (req, res, next) => {
    try {
        const item = await DatabaseVersion.findAll();
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.getByVersion = async (req, res, next) => {
    try {
        const items = await Notification.findAll({ where: { version: {[Op.gte]:req.params.version} } });
        res.status(200).json({ list: items });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


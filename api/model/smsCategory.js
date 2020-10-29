const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const SmsCategory = sequelize.define('smsCategory',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    nameRu: Sequelize.STRING,
    nameKr: Sequelize.STRING,
    info: Sequelize.TEXT,
    infoRu: Sequelize.TEXT,
    infoKr: Sequelize.TEXT,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER
})

module.exports = SmsCategory
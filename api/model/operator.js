const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Operator = sequelize.define('operator', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    descriptionRu: Sequelize.TEXT,
    descriptionKr: Sequelize.TEXT,
    balansUssd: Sequelize.STRING,//balans ni tekshirish kodi
    networkUssd: Sequelize.STRING,//internet qoldig'ini tekshirish kodi
    daqiqaUssd: Sequelize.STRING,//daqiqa qoldig'ini tekshirish kodi
    smsUssd: Sequelize.STRING,//sms qoldig'ini tekshirish kodi
    cabinet: Sequelize.STRING,
    operatorNumber:Sequelize.STRING
})

module.exports = Operator
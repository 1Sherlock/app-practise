const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Ussd = sequelize.define('ussd',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    nameRu: Sequelize.STRING,
    nameKr: Sequelize.STRING,
    ussdCode: Sequelize.STRING,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER
});

module.exports = Ussd;
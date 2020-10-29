const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Network = sequelize.define('network',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    nameRu: Sequelize.STRING,
    nameKr: Sequelize.STRING,
    price: Sequelize.STRING,
    priceRu: Sequelize.STRING,
    priceKr: Sequelize.STRING,
    hajmi: Sequelize.STRING,
    hajmiRu: Sequelize.STRING,
    hajmiKr: Sequelize.STRING,
    muddat: Sequelize.STRING,
    muddatRu: Sequelize.STRING,
    muddatKr: Sequelize.STRING,
    description: Sequelize.TEXT,
    descriptionRu: Sequelize.TEXT,
    descriptionKr: Sequelize.TEXT,
    ussdCode: Sequelize.STRING,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER,
    category: Sequelize.INTEGER
})

module.exports = Network
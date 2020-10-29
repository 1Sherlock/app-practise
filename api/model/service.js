const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Service = sequelize.define('service',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    nameRu: Sequelize.STRING,
    nameKr: Sequelize.STRING,
    description: Sequelize.TEXT,
    descriptionRu: Sequelize.TEXT,
    descriptionKr: Sequelize.TEXT,
    ussdCode: Sequelize.STRING,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER,
    category: Sequelize.INTEGER
})

module.exports = Service
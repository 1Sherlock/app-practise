const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Contact = sequelize.define('contact',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: Sequelize.TEXT,
    descriptionRu: Sequelize.TEXT,
    descriptionKr: Sequelize.TEXT,
    ussdOrPhone: Sequelize.STRING,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER
})

module.exports = Contact
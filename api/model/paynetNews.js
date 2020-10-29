const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const PaynetNews = sequelize.define('paynetNews', {
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
    date: Sequelize.STRING,
    url: Sequelize.STRING,
    urlRu: Sequelize.STRING,
    image: Sequelize.STRING,
    viewsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = PaynetNews;
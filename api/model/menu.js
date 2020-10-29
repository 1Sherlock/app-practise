const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Menu = sequelize.define('menu',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    botUrl: Sequelize.STRING,
    facebook: Sequelize.STRING,
    instagram: Sequelize.STRING,
    email: Sequelize.STRING,
    info: Sequelize.STRING,
    infoRu: Sequelize.STRING,
    infoKr: Sequelize.STRING
})

module.exports = Menu
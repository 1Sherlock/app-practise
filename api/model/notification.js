const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Notification = sequelize.define('notification',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: Sequelize.STRING,
    tableId: Sequelize.INTEGER,
    tableName: Sequelize.STRING,
    version: Sequelize.INTEGER
})

module.exports = Notification
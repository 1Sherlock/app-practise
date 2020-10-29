const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const DatabaseVersion = sequelize.define('databaseVersion',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    version:Sequelize.INTEGER
})

module.exports = DatabaseVersion
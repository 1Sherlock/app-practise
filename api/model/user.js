const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    login: {
        type:Sequelize.STRING,
        unique:true
    },
    password: Sequelize.STRING,
})

module.exports = User
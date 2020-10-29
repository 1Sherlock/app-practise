const Sequelize = require('sequelize');
const sequelize = new  Sequelize('mobilset','postgres', 'root123',{
    host: "localhost",
    dialect: "postgres"
})
module.exports = sequelize;
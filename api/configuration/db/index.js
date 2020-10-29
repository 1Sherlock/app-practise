const Sequelize = require('sequelize');
const sequelize = new  Sequelize('de2r7hno9ss8dc','ibmatkkhlvwana', 'a402ecf2eb0ab1063a1b344193e835e811dd7f581ad28b14a15a74c40e758081',{
    host: "ec2-34-231-56-78.compute-1.amazonaws.com",
    dialect: "postgres"
})
module.exports = sequelize;
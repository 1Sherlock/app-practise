const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Slider = sequelize.define('slider', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: Sequelize.STRING,
    url: Sequelize.STRING,
    order: Sequelize.INTEGER
});

module.exports = Slider;
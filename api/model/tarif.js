const Sequelize = require("sequelize");
const sequelize = require("../configuration/db");
const Tarif = sequelize.define('tarif', {
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
    batafsil: Sequelize.TEXT,
    batafsilRu: Sequelize.TEXT,
    batafsilKr: Sequelize.TEXT,
    ussdCode: Sequelize.STRING,
    order: Sequelize.INTEGER,
    operator: Sequelize.INTEGER,
    similarTarifUzmobile: {type:Sequelize.INTEGER,defaultValue:0},
    similarTarifUms: {type:Sequelize.INTEGER,defaultValue:0},
    similarTarifUcell: {type:Sequelize.INTEGER,defaultValue:0},
    similarTarifBeeline: {type:Sequelize.INTEGER,defaultValue:0},
    similarTarifPerfectum: {type:Sequelize.INTEGER,defaultValue:0},
    image: Sequelize.STRING,
});

module.exports = Tarif;
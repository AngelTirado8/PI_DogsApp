const { DataTypes } = require('sequelize');// importo el modeloDataTypes
const db = require('../db'); //aca importo los archivos de configuracion

const Temperament = db.define('Temperament', { //defino el modelo usando el define
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
});

module.exports = Temperament;
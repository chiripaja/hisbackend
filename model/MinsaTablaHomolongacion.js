const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const MinsaTablaHomolongacion = SIGHBD.define('MinsaTablaHomolongacion', {
    codigo: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    tipo: DataTypes.STRING,   
}, {
    tableName: 'MinsaTablaHomolongacion',
    timestamps: false
})


module.exports = MinsaTablaHomolongacion

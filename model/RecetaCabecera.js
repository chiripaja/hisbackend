const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const RecetaDetalle = require('./RecetaDetalle');



const RecetaCabecera = SIGHBD.define('RecetaCabecera', {
    idReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idCuentaAtencion:DataTypes.STRING,
}, {
    tableName: 'RecetaCabecera',
    timestamps: false
})

RecetaCabecera.hasMany(RecetaDetalle, {
    foreignKey: 'idReceta',
    targetKey: 'idReceta'
})



module.exports = RecetaCabecera
const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const FactCatalogoServicios = require('./FactCatalogoServicios');



const RecetaDetalle = SIGHBD.define('RecetaDetalle', {
    idReceta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idItem:DataTypes.STRING,
}, {
    tableName: 'RecetaDetalle',
    timestamps: false
})

RecetaDetalle.hasMany(FactCatalogoServicios, {
    foreignKey: 'IdProducto',
    sourceKey: 'idItem'
})


module.exports = RecetaDetalle
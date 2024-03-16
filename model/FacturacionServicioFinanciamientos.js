const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const FactCatalogoServicios = require('./FactCatalogoServicios');


const FacturacionServicioFinanciamientos = SIGHBD.define('FacturacionServicioFinanciamientos', {
    idOrden: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    idProducto: DataTypes.INTEGER,
}, {
    tableName: 'FacturacionServicioFinanciamientos',
    timestamps: false
})

FacturacionServicioFinanciamientos.belongsTo(FactCatalogoServicios,{
    foreignKey:'idProducto'
})

module.exports = FacturacionServicioFinanciamientos
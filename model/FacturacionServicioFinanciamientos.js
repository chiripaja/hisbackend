const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const FactCatalogoServicios = require('./FactCatalogoServicios');
const FactOrdenServicio = require('./FactOrdenServicio');


const FacturacionServicioFinanciamientos = SIGHBD.define('FacturacionServicioFinanciamientos', {
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProducto: DataTypes.INTEGER,
}, {
    tableName: 'FacturacionServicioFinanciamientos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['idOrden', 'idProducto']
        }
    ]
})
FacturacionServicioFinanciamientos.removeAttribute('id');

FacturacionServicioFinanciamientos.hasMany(FactCatalogoServicios,{
    foreignKey:'IdProducto',
    sourceKey: 'idProducto'
})
module.exports = FacturacionServicioFinanciamientos
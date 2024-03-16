const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const FactCatalogoServicios = SIGHBD.define('FactCatalogoServicios', {
    IdProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Codigo: DataTypes.INTEGER,
}, {
    tableName: 'FactCatalogoServicios',
    timestamps: false
})



module.exports = FactCatalogoServicios
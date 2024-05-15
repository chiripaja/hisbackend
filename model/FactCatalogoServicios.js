const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const MinsaTablaHomolongacion = require('./MinsaTablaHomolongacion');


const FactCatalogoServicios = SIGHBD.define('FactCatalogoServicios', {
    IdProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Codigo: DataTypes.INTEGER,
    CodMINSA: DataTypes.STRING,
    Nombre: DataTypes.STRING,
    IdServicioSeccion:DataTypes.STRING,
}, {
    tableName: 'FactCatalogoServicios',
    timestamps: false
})


FactCatalogoServicios.belongsTo(MinsaTablaHomolongacion, {
    foreignKey: 'CodMINSA',
    targetKey: 'codigo'
})

module.exports = FactCatalogoServicios
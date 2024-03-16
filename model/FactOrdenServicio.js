const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const FacturacionServicioFinanciamientos = require('./FacturacionServicioFinanciamientos');


const FactOrdenServicio = SIGHBD.define('FactOrdenServicio', {
    IdOrden: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    IdUsuario: DataTypes.INTEGER,
    IdCuentaAtencion: DataTypes.INTEGER
}, {
    tableName: 'FactOrdenServicio',
    timestamps: false
})
FactOrdenServicio.belongsTo(FacturacionServicioFinanciamientos,{
    foreignKey:'IdOrden'
})


module.exports = FactOrdenServicio
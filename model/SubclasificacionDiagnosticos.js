
const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');



const SubclasificacionDiagnosticos = SIGHBD.define('SubclasificacionDiagnosticos', {
    IdSubclasificacionDx: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Codigo: {
        type: DataTypes.STRING,
    }

}, {
    tableName: 'SubclasificacionDiagnosticos',
    timestamps: false
})


module.exports = SubclasificacionDiagnosticos
const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const SubclasificacionDiagnosticos = require('./SubclasificacionDiagnosticos');
const Diagnosticos = require('./Diagnosticos');



const AtencionesDiagnosticos = SIGHBD.define('AtencionesDiagnosticos', {
    IdAtencionDiagnostico: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    IdAtencion:  DataTypes.INTEGER,
    IdSubclasificacionDx:DataTypes.INTEGER,
    IdDiagnostico:DataTypes.INTEGER
}, {
    tableName: 'AtencionesDiagnosticos',
    timestamps: false
})

AtencionesDiagnosticos.belongsTo(SubclasificacionDiagnosticos, {
    foreignKey: 'IdSubclasificacionDx', 
    targetKey: 'IdSubclasificacionDx', 
})

AtencionesDiagnosticos.belongsTo(Diagnosticos,{
    foreignKey:'IdDiagnostico',
    targetKey:'IdDiagnostico'
})

module.exports = AtencionesDiagnosticos
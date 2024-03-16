const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const Empleados = require('./Empleados');


const Medicos = SIGHBD.define('Medicos', {
    IdMedico: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    IdEmpleado: DataTypes.INTEGER,   
}, {
    tableName: 'Medicos',
    timestamps: false
})
Medicos.belongsTo(Empleados,{
    foreignKey:'IdEmpleado',
    targetKey: 'IdEmpleado', 
})



module.exports = Medicos
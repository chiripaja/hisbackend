const { Sequelize, DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const Pacientes = require('./Pacientes');


const Paises=SIGHBD.define('Paises',{
    IdPais: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    Codigo: DataTypes.STRING
},{
    tableName: 'Paises',
    timestamps: false 
})


module.exports=Paises
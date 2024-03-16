const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const TiposEmpleado=SIGHBD.define('TiposEmpleado',{
    IdTipoEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      TipoEmpleadoHIS: DataTypes.STRING
},{
    tableName: 'TiposEmpleado',
    timestamps: false 
})



module.exports=TiposEmpleado
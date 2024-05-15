const {  DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const Servicios=SIGHBD.define('Servicios',{
    IdServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      codigoServicioSuSalud: DataTypes.STRING,
      codigoServicioHIS:DataTypes.STRING,
      Nombre:DataTypes.STRING,
},{
    tableName: 'Servicios',
    timestamps: false 
})



module.exports=Servicios
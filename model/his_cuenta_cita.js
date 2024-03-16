const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const his_cuenta_cita=SIGHBD.define('his_cuenta_cita',{
    idAtencion: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    idcita:DataTypes.STRING,
    fecha: DataTypes.STRING
},{
    tableName: 'his_cuenta_cita',
    timestamps: false 
})



module.exports=his_cuenta_cita
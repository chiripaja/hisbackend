const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');


const TiposSexo=SIGHBD.define('TiposSexo',{
    IdTipoSexo: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      Descripcion: DataTypes.STRING
},{
    tableName: 'TiposSexo',
    timestamps: false 
})



module.exports=TiposSexo


const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');



const Diagnosticos = SIGHBD.define('Diagnosticos', {
    IdDiagnostico: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    CodigoCIE10:  DataTypes.STRING,
    codigoCIEsinPto:DataTypes.STRING

}, {
    tableName: 'Diagnosticos',
    timestamps: false
})


module.exports = Diagnosticos
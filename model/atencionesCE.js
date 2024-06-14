const { DataTypes } = require('sequelize');
const { SIGHBD_EXTERNA, SIGHBD } = require('../sequilize/sequilize');


const atencionesCE = SIGHBD.define('triaje', {
    idAtencion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    TriajePeso: DataTypes.STRING,
    TriajeTalla: DataTypes.STRING
}, {
    tableName: 'atencionesCE',
    timestamps: false
})



module.exports = atencionesCE
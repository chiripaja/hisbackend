const { DataTypes } = require('sequelize');
const { SIGHBD_EXTERNA, SIGHBD } = require('../sequilize/sequilize');


const atencionesCE = SIGHBD_EXTERNA.define('triaje', {
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
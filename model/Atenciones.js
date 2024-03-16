const { DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const Pacientes = require('./Pacientes');
const Medicos = require('./Medicos');
const AtencionesDiagnosticos = require('./AtencionesDiagnosticos');
const Servicios = require('./Servicios');
const FactOrdenServicio = require('./FactOrdenServicio');
const atencionesCE = require('./atencionesCE');
const his_cuenta_cita = require('./his_cuenta_cita');


const atenciones = SIGHBD.define('atenciones', {
    IdAtencion: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    IdPaciente: {
        type: DataTypes.INTEGER,
    },
    FechaIngreso: DataTypes.DATE,
    IdMedicoIngreso: DataTypes.INTEGER,
    IdServicioIngreso: DataTypes.STRING,
    HoraIngreso: DataTypes.STRING,
    idFuenteFinanciamiento: DataTypes.STRING,
    FyHFinal:DataTypes.STRING,
    FechaAtencionFormatted: {
        type: DataTypes.VIRTUAL,
        get() {
            const FechaIngreso = this.getDataValue('FechaIngreso');
            return FechaIngreso ? FechaIngreso.toISOString().slice(0, 10).replace(/-/g, '') : null;
        },
    },
    horaTurno: {
        type: DataTypes.VIRTUAL,
        get() {
            const HoraIngreso = this.getDataValue('HoraIngreso').slice(0, 2);
            if (HoraIngreso >= 13) {
                return "T"
            } else {
                return "M"
            }
            return null;
        }
    },
    idFuenteFinanciamientoformatted: {
        type: DataTypes.VIRTUAL,
        get() {
            const idFuenteFinanciamientoformatted = this.getDataValue('idFuenteFinanciamiento');
            let dato;
            switch (idFuenteFinanciamientoformatted) {
                case 1:
                    dato = "1";
                    break;
                case 2:
                    dato = "4"
                    break;
                case 3:
                    dato = "2"
                    break;
                case 4:
                    dato = "4"
                    break;
                case 5:
                    dato = "1"
                    break;
                case 6:
                    dato = "3"
                    break;
                case 7:
                    dato = "10"
                    break;
                case 8:
                    dato = "9"
                    break;
                case 9:
                    dato = "10"
                    break;
                case 10:
                    dato = "10"
                    break;
                case 11:
                    dato = "5"
                    break;
                case 12:
                    dato = "6"
                    break;
                case 13:
                    dato = "7"
                    break;
                case 14:
                    dato = "10"
                    break;
                case 17:
                    dato = "10"
                    break;
                case 18:
                    dato = "10"
                    break;
                case 19:
                    dato = "10"
                    break;
                case 20:
                    dato = "11"
                    break;




                default:
                    dato = idFuenteFinanciamientoformatted

            }
            return dato;
        }
    },
    FechaEgreso: DataTypes.DATE,
}, {
    tableName: 'atenciones',
    timestamps: false
})
atenciones.belongsTo(Pacientes, {
    foreignKey: 'IdPaciente',
    targetKey: 'IdPaciente',
    allowNull: true
})

atenciones.belongsTo(Medicos, {
    foreignKey: 'IdMedicoIngreso',
    targetKey: 'IdMedico',
    allowNull: true
})

atenciones.hasMany(AtencionesDiagnosticos, {
    foreignKey: 'IdAtencion',
})

atenciones.belongsTo(Servicios, {
    foreignKey: 'IdServicioIngreso',
    targetKey: 'IdServicio'
})

atenciones.hasMany(FactOrdenServicio, {
    foreignKey: 'IdCuentaAtencion',
})


atenciones.hasOne(atencionesCE, {
    foreignKey: 'IdAtencion',
    targetKey: 'idAtencion'
})

atenciones.hasOne(his_cuenta_cita, {
    foreignKey: 'idAtencion',
    targetKey: 'idAtencion'
})


module.exports = atenciones
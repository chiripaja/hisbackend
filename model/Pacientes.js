const { Sequelize, DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const TiposSexo = require('./TiposSexo');
const Paises = require('./Paises');
const Medicos = require('./Medicos');

const Pacientes = SIGHBD.define('Pacientes', {
    IdPaciente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ApellidoPaterno: {
        type: DataTypes.STRING,
    },
    ApellidoMaterno: {
        type: DataTypes.STRING,
    },
    PrimerNombre: {
        type: DataTypes.STRING,
    },
    SegundoNombre: {
        type: DataTypes.STRING,
    },
    IdTipoSexo: {
        type: DataTypes.STRING,
    },
    NroDocumento: {
        type: DataTypes.STRING,
    },
    IdDocIdentidad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IdEtnia: {
        type: DataTypes.STRING,
    },
    FechaNacimiento: {
        type: DataTypes.DATE,
    },
    NroHistoriaClinica: {
        type: DataTypes.STRING,
    },
    IdTipoSexo: {
        type: DataTypes.STRING,
    },
    DireccionDomicilio:{
        type:DataTypes.STRING,
    },
    NombreCompleto: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.PrimerNombre} ${this.SegundoNombre ? this.SegundoNombre : ""}`;
        }
    },
    FechaNacimientoFormatted: {
        type: DataTypes.VIRTUAL,
        get() {
            const fechaNacimiento = this.getDataValue('FechaNacimiento');
            return fechaNacimiento ? fechaNacimiento.toISOString().slice(0, 10).replace(/-/g, '') : null;
        },
    },

    getFechaActualUTC: {
        type: DataTypes.VIRTUAL,
        get() {
            const fechaActual = new Date();
            const offsetMilisegundos = fechaActual.getTimezoneOffset() * 60 * 1000;
            const fechaActualUTC = new Date(fechaActual.getTime() - offsetMilisegundos);
            return fechaActualUTC;
        }
    },

    DiasVividos: {
        type: DataTypes.VIRTUAL,
        get() {
            const fechaActual = new Date();


            const diaActual = fechaActual.getDate();
            return diaActual
        },
    },

    mesesVividos: {
        type: DataTypes.VIRTUAL,
        get() {
            const fechaActual = new Date();
            const mesActual = fechaActual.getMonth() + 1;
            return mesActual
        },
    },

    aniosVividos: {
        type: DataTypes.VIRTUAL,
        get() {
            const fechaNacimiento = this.getDataValue('FechaNacimiento');
            if (fechaNacimiento) {
                const fechaActualUTC = new Date(this.get('getFechaActualUTC'));
                const aniostranscurridos = (fechaActualUTC.getFullYear() - fechaNacimiento.getFullYear());
                return aniostranscurridos;
            } else {
                return null;
            }
        },
    },

    edadregistro:{
        type: DataTypes.VIRTUAL,
        get() {
            const fechaNacimiento = this.getDataValue('FechaNacimiento');
            if (fechaNacimiento) {
                const fechaActualUTC = new Date(this.get('getFechaActualUTC'));
                const aniostranscurridos = (fechaActualUTC.getFullYear() - fechaNacimiento.getFullYear());
                if(aniostranscurridos===0){
                    return "1";
                }
                return aniostranscurridos;
            } else {
                return null;
            }
        },
    },

    IdPaisNacimiento: {
        type: DataTypes.STRING,
    },

    IdDocIdentidadformated: {
        type: DataTypes.VIRTUAL,
        get() {
            const IdDocIdentidad = this.getDataValue('IdDocIdentidad');
            let dato;
            switch (IdDocIdentidad) {
                case 5:
                    dato = "5";
                    break;
                case 4:
                    dato = "5"
                    break;
                case 5:
                    dato = "5"
                    break;
                case 6:
                    dato = "5"
                    break;
                case 9:
                    dato = "5"
                    break;
                case 10:
                    dato = "5"
                    break;
                default:
                    dato = IdDocIdentidad

            }
            return dato;
        },
    },



}, {
    tableName: 'Pacientes',
    timestamps: false
})

Pacientes.belongsTo(TiposSexo, {
    foreignKey: 'IdTipoSexo',
    targetKey: 'IdTipoSexo',
    allowNull: true
})

Pacientes.belongsTo(Paises, {
    foreignKey: 'IdPaisNacimiento',
    targetKey: 'IdPais',
})



module.exports = Pacientes
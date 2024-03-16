const { Sequelize, DataTypes } = require('sequelize');
const { SIGHBD } = require('../sequilize/sequilize');
const TiposSexo = require('./TiposSexo');
const Paises = require('./Paises');
const TiposEmpleado = require('./TiposEmpleado');


const Empleados = SIGHBD.define('Empleados', {
    IdEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    DNI:DataTypes.STRING,
    ApellidoMaterno:DataTypes.STRING,
    pais:DataTypes.STRING,
    IdTipoEmpleado:DataTypes.STRING,
    FechaNacimiento:DataTypes.DATE,
    idTipoDocumento:DataTypes.STRING,
    ApellidoPaterno:DataTypes.STRING,    
    Nombres:DataTypes.STRING,    
    sexo:DataTypes.STRING,
    IdTipoEmpleado:DataTypes.INTEGER,
    IdCondicionTrabajo:DataTypes.STRING,

    FechaNacimientoFormattedMedico: {
        type: DataTypes.VIRTUAL,
        get() {
            // Formatear la fecha de nacimiento en el formato AAAAMMDD
            const fechaNacimiento = this.getDataValue('FechaNacimiento');
            return fechaNacimiento ? fechaNacimiento.toISOString().slice(0, 10).replace(/-/g, '') : null;
        },
    },

    idTipoDocumentoformated: {
        type: DataTypes.VIRTUAL,
        get() {
            const idTipoDocumento = this.getDataValue('idTipoDocumento');
            let dato;
            switch(idTipoDocumento){
                case 5:
                    dato="5";
                    break;
                case 4:
                    dato="5"
                    break;
                case 5:
                    dato="5"
                    break;
                case 6:
                    dato="5"
                    break;
                case 9:
                    dato="5"
                    break;
                case 10:
                    dato="5"
                    break;
                default:
                    dato=idTipoDocumento

            }
            return dato;
        },
    },

    IdCondicionTrabajoFormated:{
        type:DataTypes.VIRTUAL,
        get(){
            const idcondiciontrabajo=this.getDataValue('IdCondicionTrabajo');
            let dato;
            switch(idcondiciontrabajo){
                case 1:
                    dato="1";
                    break;
                case 4:
                    dato="4"
                    break;
                case 5:
                    dato="5"
                    break;
                case 6:
                    dato="6"
                    break;
                case 9:
                    dato="8"
                    break;
                case 10:
                    dato="9"
                    break;
                case 11:
                    dato="8"
                    break;
                case 12:
                    dato="8"
                    break;
                case 20:
                    dato="2"
                    break;
                case 21:
                    dato="8"
                    break;
                case 22:
                    dato="2"
                    break;
                case 23:
                    dato="3"
                    break;
                case 30:
                    dato="3"
                    break;
                case 31:
                    dato="3"
                    break;
                case 32:
                    dato="2"
                    break;
                case 33:
                    dato="2"
                    break;
                default:
                    dato=idcondiciontrabajo

            }
            return dato;
        }
    }
}, {
    tableName: 'Empleados',
    timestamps: false
})



Empleados.belongsTo(TiposSexo,{
    foreignKey: 'sexo', 
    targetKey: 'IdTipoSexo',
    allowNull: true
})

Empleados.belongsTo(Paises, {
    foreignKey: 'pais', 
    targetKey: 'IdPais', 
})

Empleados.belongsTo(TiposEmpleado,{
    foreignKey:'IdTipoEmpleado',
    targetKey:'IdTipoEmpleado'
})

module.exports = Empleados
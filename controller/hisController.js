const { response } = require('express');
const atenciones = require('../model/Atenciones');
const Pacientes = require('../model/Pacientes');
const TiposSexo = require('../model/TiposSexo');
const { Sequelize, Op, col } = require('sequelize');
const Paises = require('../model/Paises');
const Medicos = require('../model/Medicos');
const Empleados = require('../model/Empleados');
const AtencionesDiagnosticos = require('../model/AtencionesDiagnosticos');
const SubclasificacionDiagnosticos = require('../model/SubclasificacionDiagnosticos');
const Diagnosticos = require('../model/Diagnosticos');
const Servicios = require('../model/Servicios');
const FactOrdenServicio = require('../model/FactOrdenServicio');
const FacturacionServicioFinanciamientos = require('../model/FacturacionServicioFinanciamientos');
const FactCatalogoServicios = require('../model/FactCatalogoServicios');
const atencionesCE = require('../model/atencionesCE');
const { SIGHBD_EXTERNA } = require('../sequilize/sequilize');
const TiposEmpleado = require('../model/TiposEmpleado');
const his_cuenta_cita = require('../model/his_cuenta_cita');
const moment = require('moment');

const findAll = async (req, res = response) => {
    try {

        const paciente = await atenciones.findAll({
          
            include: [
                his_cuenta_cita,
                {
                    model: atencionesCE,
                },

                Servicios,
                {
                    model: FactOrdenServicio,
                    include: [{
                        model: FacturacionServicioFinanciamientos,
                        include: [{
                            model: FactCatalogoServicios
                        }]
                    }]
                },
                {
                    model: AtencionesDiagnosticos,
                    include: [
                        SubclasificacionDiagnosticos, Diagnosticos
                    ]
                },
                {
                    model: Medicos,
                    include: [{
                        model: Empleados,
                        include: [TiposSexo, Paises, TiposEmpleado]
                    }]
                },
                {
                    model: Pacientes,
                    include: [TiposSexo, Paises],
                }
            ],
            where: {
                IdAtencion:{
                    [Sequelize.Op.in]:['134408','134409','136937']
                } 
            }
        });
        /*   const dataPlana = paciente.map((data) => {
            const tipodiagnostico = [];
            const idEmpleadoMedico = data.Medico.IdEmpleado;
            data.FactOrdenServicios.forEach((FacturacionServicioFinanciamiento) => {
                if (idEmpleadoMedico === FacturacionServicioFinanciamiento.IdUsuario) {
                    tipodiagnostico.push({
                        tipodiagnostico: "D",
                        codigo: FacturacionServicioFinanciamiento?.FacturacionServicioFinanciamiento.FactCatalogoServicio.Codigo,
                        tipoitem: "CP",
                        codigolote: "",
                    })
                }

            })
            data.AtencionesDiagnosticos.forEach((diagnostico) => {
                tipodiagnostico.push({
                    tipodiagnostico: diagnostico.SubclasificacionDiagnostico?.Codigo,
                    codigo: diagnostico.Diagnostico?.codigoCIEsinPto.trim(),
                    tipoitem: "CX",
                    codigolote: "",
                });
            });
            return {
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita:"",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha:"",
                IdAtencion: data.IdAtencion,
                IdPaciente: data.IdPaciente,
                cita: {
                    numeroafiliacion: "",
                    fechaatencion: data.FechaAtencionFormatted,
                    estadoregistro: "A",
                    items: tipodiagnostico,
                    idups: data.Servicio?.codigoServicioHIS ? data.Servicio?.codigoServicioHIS.trim() : "",
                    idestablecimiento: "00754",
                    idtipedadregistro: "A",
                    edadregistro: data.Paciente?.aniosVividos.toString(),
                    annioedad: data.Paciente?.aniosVividos.toString(),
                    mesedad: data.Paciente?.mesesVividos.toString(),
                    diaedad: data.Paciente?.DiasVividos.toString(),
                    idturno: data.horaTurno,
                    fgdiag: "21",
                    componente: "",
                    idfinanciador: data.idFuenteFinanciamientoformatted,
                    idtipcondestab: "",
                    idtipcondserv: "",
                    fechaultimaregla: "",
                    idcondiciongestante: "",

                    examenfisico: {
                        peso: data.triaje ? data.triaje?.TriajePeso : "",
                        talla: data.triaje ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise.Codigo,
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise.Codigo,
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                paciente: {
                    nrodocumento: data.Paciente?.NroDocumento,                
                    apematerno: data.Paciente?.ApellidoMaterno,                    
                    idflag: '5',
                    nombres: data.Paciente?.NombreCompleto.trim(),
                    nrohistoriaclinica: data.Paciente?.NroHistoriaClinica,
                    idtipodoc: data.Paciente?.IdDocIdentidadformated.toString(),
                    apepaterno: data.Paciente?.ApellidoPaterno,
                    idetnia: '58',
                    fechanacimiento: data.Paciente?.FechaNacimientoFormatted,
                    idestablecimiento: '00754',
                    idpais: data.Paciente?.Paise.Codigo,
                    idsexo: data.Paciente?.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                },
            };
        });
         
     */
        res.status(200).json(paciente)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const enviarhis = async (req, res = response) => {
    try {
        const fechaActual = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS'); 
        
      const [data, created] = await his_cuenta_cita.findOrCreate(
            {
                where: { idAtencion: req.body.idatencion },
                defaults: { idAtencion: req.body.idatencion, idcita: req.body.idcitatoken ,fecha:fechaActual}
            }
        )
      
        if (!created) {
            return res.status(400).json({ ok: false, msj: "El numero de cuenta ya ingreso." })
        }  /* */
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



const findByFechas = async (req, res = response) => {
    try {
        let fechafin2 = moment(req.body.end, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const fechafinformat = fechafin2.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        let fechainicio2=moment(req.body.start,'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const fechainicioformate=fechainicio2.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    




        const paciente = await atenciones.findAll({
            
            include: [
                his_cuenta_cita,
                {
                    model: atencionesCE,
                },

                Servicios,
                {
                    model: FactOrdenServicio,
                    include: [{
                        model: FacturacionServicioFinanciamientos,
                        include: [{
                            model: FactCatalogoServicios
                        }]
                    }]
                },
                {
                    model: AtencionesDiagnosticos,
                    include: [
                        SubclasificacionDiagnosticos, Diagnosticos
                    ]
                },
                {
                    model: Medicos,
                    include: [{
                        model: Empleados,
                        include: [TiposSexo, Paises, TiposEmpleado]
                    }]
                },
                {
                    model: Pacientes,
                    include: [TiposSexo, Paises],
                }
            ],
            where: {               
                FyHFinal:{
                    [Sequelize.Op.between]:[fechainicioformate,fechafinformat]
                }
               
                 
                
            }
        });
        
        const dataPlana = paciente.map((data) => {
            const tipodiagnostico = [];
            const idEmpleadoMedico = data.Medico.IdEmpleado;
            data.FactOrdenServicios.forEach((FacturacionServicioFinanciamiento) => {
                if (idEmpleadoMedico === FacturacionServicioFinanciamiento.IdUsuario && FacturacionServicioFinanciamiento?.FacturacionServicioFinanciamiento?.FactCatalogoServicio) {
                    tipodiagnostico.push({
                        tipodiagnostico: "D",
                        codigo: FacturacionServicioFinanciamiento.FacturacionServicioFinanciamiento.FactCatalogoServicio.Codigo,
                        tipoitem: "CP",
                        codigolote: "",
                    })
                }

            })
            data.AtencionesDiagnosticos.forEach((diagnostico) => {
                tipodiagnostico.push({
                    tipodiagnostico: diagnostico.SubclasificacionDiagnostico?.Codigo,
                    codigo: diagnostico.Diagnostico?.codigoCIEsinPto.trim(),
                    tipoitem: "CX",
                    codigolote: "",
                });
            });
            return {
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita:"",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha:"",
                IdAtencion: data.IdAtencion,
                IdPaciente: data.IdPaciente,
                cita: {
                    numeroafiliacion: "",
                    fechaatencion: data.FechaAtencionFormatted,
                    estadoregistro: "A",
                    items: tipodiagnostico,
                    idups: data.Servicio?.codigoServicioHIS ? data.Servicio?.codigoServicioHIS.trim() : "",
                    idestablecimiento: "00754",
                    idtipedadregistro: "A",
                    edadregistro: data.Paciente?.aniosVividos.toString(),
                    annioedad: data.Paciente?.aniosVividos.toString(),
                    mesedad: data.Paciente?.mesesVividos.toString(),
                    diaedad: data.Paciente?.DiasVividos.toString(),
                    idturno: data.horaTurno,
                    fgdiag: "21",
                    componente: "",
                    idfinanciador: data.idFuenteFinanciamientoformatted,
                    idtipcondestab: "",
                    idtipcondserv: "",
                    fechaultimaregla: "",
                    idcondiciongestante: "",

                    examenfisico: {
                        peso: data.triaje?.TriajePeso  ? data.triaje?.TriajePeso : "",
                        talla: data.triaje?.TriajeTalla ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo:"PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo:"PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                paciente: {
                    nrodocumento: data.Paciente?.NroDocumento,                
                    apematerno: data.Paciente?.ApellidoMaterno,                    
                    idflag: '5',
                    nombres: data.Paciente?.NombreCompleto.trim(),
                    nrohistoriaclinica: data.Paciente?.NroHistoriaClinica,
                    idtipodoc: data.Paciente?.IdDocIdentidadformated.toString(),
                    apepaterno: data.Paciente?.ApellidoPaterno,
                    idetnia: '58',
                    fechanacimiento: data.Paciente?.FechaNacimientoFormatted,
                    idestablecimiento: '00754',
                    idpais: data.Paciente?.Paise.Codigo,
                    idsexo: data.Paciente?.TiposSexo.Descripcion.charAt(0).toUpperCase(),
                },
            };
        });
           
      /**/
        res.status(200).json(dataPlana)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}



module.exports = {
    findAll,
    findByFechas,
    enviarhis
}
const { response } = require('express');
const atenciones = require('../model/Atenciones');
const Pacientes = require('../model/Pacientes');
const TiposSexo = require('../model/TiposSexo');
const { Sequelize, Op, col, Model } = require('sequelize');
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
const TiposEmpleado = require('../model/TiposEmpleado');
const his_cuenta_cita = require('../model/his_cuenta_cita');
const moment = require('moment');
const RecetaCabecera = require('../model/RecetaCabecera');
const RecetaDetalle = require('../model/RecetaDetalle');
const MinsaTablaHomolongacion = require('../model/MinsaTablaHomolongacion');
const { default: axios } = require('axios');
const his_cuenta_cita_prueba = require('../model/his_cuenta_cita_prueba');

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
                IdAtencion: {
                    [Sequelize.Op.in]: ['134408', '134409', '136937']
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
        const [data, created] = await his_cuenta_cita.findOrCreate(
            {
                where: { idAtencion: req.body.idatencion },
                defaults: { idAtencion: req.body.idatencion, idcita: req.body.idcitatoken }
            }
        )
        if (!created) {
            return res.status(400).json({ ok: false, msj: "El numero de cuenta ya ingreso." })
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const enviarhisprueba = async (req, res = response) => {
    try {
        const [data, created] = await his_cuenta_cita_prueba.findOrCreate(
            {
                where: { idAtencion: req.body.idatencion },
                defaults: { idAtencion: req.body.idatencion, idcita: req.body.idcitatoken }
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
        let fechainicio2 = moment(req.body.start, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const fechainicioformate = fechainicio2.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const paciente = await atenciones.findAll({

            include: [
                his_cuenta_cita,
                /* {
                     model: RecetaCabecera,
                     required: true,
                     include: {
                         required: true,
                         model: RecetaDetalle,
                         include: {
                             required: true,
                             model: FactCatalogoServicios,
                         }
                     }
                 },*/
                {
                    model: atencionesCE,
                },
                {
                    model: Servicios,
                    /*where: {
                        Nombre: { [Op.like]: '%CE.%' },
                    }*/
                    where: {
                        IdServicio: [
                            37,
                            1407,
                            160,
                            1363,
                            1365,
                            1410,
                            1349,
                            174,
                            1556,
                            169,
                            1364,
                            1366,
                            178,
                            1524,
                            140,
                            1468,
                            1373,
                            163,
                            162,
                            1533,
                            1534,
                            328,
                            1412,
                            1515,
                            143,
                            246,
                            1409,
                            35,
                            1561,
                            1520,
                            66,
                            1368,
                            1369,
                            1436,
                            306,
                            1411,
                            175,
                            1469,
                            146,
                            1408,
                            177,
                            1449,
                            39,
                            36,
                            1437,
                            1438,
                            1479,
                            144,
                            1367,
                            1373,
                            1398,
                            1399,
                            257,
                            258,
                            259,
                            1397,
                            1508,
                            1509,
                            1557
                        ],
                    }
                },
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
                FyHFinal: {
                    [Sequelize.Op.between]: [fechainicioformate, fechafinformat]
                },
                /*IdAtencion: {
                    [Sequelize.Op.in]: ['170140']
                }*/
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
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita : "",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha : "",
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
                    edadregistro: data.Paciente?.edadregistro.toString(),
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
                        peso: data.triaje?.TriajePeso ? data.triaje?.TriajePeso : "",
                        talla: data.triaje?.TriajeTalla ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
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

        //res.status(200).json(dataPlana)
        res.status(200).json(req.body)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const ver = async (req, res = response) => {
    try {
        const paciente = await atenciones.findAll({

            include: [
                {
                    model: RecetaCabecera,
                    required: true,
                    include: {
                        required: true,
                        model: RecetaDetalle,
                        include: {
                            model: FactCatalogoServicios,
                            include: {
                                model: MinsaTablaHomolongacion
                            }
                        }
                    }
                },
            ],
            where: {
                IdAtencion: {
                    [Sequelize.Op.in]: ['167879']
                }
            }
        });

        res.status(200).json(paciente)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}





const findByFechasTotal = async (req, res = response) => {
    try {
        let fechafin2 = moment(req.body.end, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const fechafinformat = fechafin2.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        let fechainicio2 = moment(req.body.start, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const fechainicioformate = fechainicio2.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const paciente = await atenciones.findAll({
            include: [
                his_cuenta_cita,
                {
                    model: RecetaCabecera,
                    required: true,
                    include: {
                        required: true,
                        model: RecetaDetalle,
                        include: {
                            required: true,
                            model: FactCatalogoServicios,
                            include: {
                                model: MinsaTablaHomolongacion
                            }
                        }
                    }
                },
                {
                    model: atencionesCE,
                },
                {
                    model: Servicios,
                    where: {
                        Nombre: { [Op.like]: '%CE.%' },
                    }
                },
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
                FyHFinal: {
                    [Sequelize.Op.between]: [fechainicioformate, fechafinformat]
                },
                /* IdAtencion: {
                     [Sequelize.Op.in]: ['167879']
                 }*/
            }
        });

        const dataPlana = paciente.map((data) => {
            const tipodiagnostico = [];
            const idEmpleadoMedico = data.Medico.IdEmpleado;

            data.RecetaCabeceras.forEach((cabecera) => {

                cabecera.RecetaDetalles.forEach((detalle) => {

                    detalle.FactCatalogoServicios.forEach((factCatalogoServicio) => {
                        console.log(factCatalogoServicio.IdServicioSeccion)
                        tipodiagnostico.push({
                            tipodiagnostico: "D",
                            codigo: factCatalogoServicio.CodMINSA,
                            tipoitem: factCatalogoServicio.MinsaTablaHomolongacion ? factCatalogoServicio.MinsaTablaHomolongacion.tipo : "",
                            codigolote: "",
                        })
                    })
                })

            })
            /* */
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
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita : "",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha : "",
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
                        peso: data.triaje?.TriajePeso ? data.triaje?.TriajePeso : "",
                        talla: data.triaje?.TriajeTalla ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
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

        res.status(200).json(dataPlana)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


const enviarApiHisData = async (req, res = response) => {
    try {
        //prueba
        //const data = await axios.post('http://dpidesalud.minsa.gob.pe:18080/mcs-sihce-hisminsa/integracion/v1.0/paquete/actualizar', req.body)
        //produccion
          const data = await axios.post('http://pidesalud.minsa.gob.pe:18061/mcs-sihce-hisminsa/integracion/v1.0/paquete/actualizar/', req.body)
        console.log(data)
        res.status(200).json(data.data)
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: error.response.data.descripcion })
    }
}

















const findByFechasPrueba = async (req, res = response) => {
    try {
        let fechafin2 = moment(req.body.end, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const fechafinformat = fechafin2.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        let fechainicio2 = moment(req.body.start, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const fechainicioformate = fechainicio2.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const paciente = await atenciones.findAll({
            include: [
                his_cuenta_cita,
                /* {
                     model: RecetaCabecera,
                     required: true,
                     include: {
                         required: true,
                         model: RecetaDetalle,
                         include: {
                             required: true,
                             model: FactCatalogoServicios,
                         }
                     }
                 },*/
                {
                    model: atencionesCE,
                },
                {
                    model: Servicios,
                    where: {

                        IdServicio: [
                            /*  37,
                              1407,
                              160,
                              1363,
                              1365,
                              1410,
                              1349,
                              174,
                              1556,
                              169,
                              1364,
                              1366,
                              178,
                              1524,
                              140,
                              1468,
                              1373,
                              163,
                              162,
                              1533,
                              1534,
                              328,
                              1412,
                              1515,
                              143,
                              246,
                              1409,
                              35,
                              1561,
                              1520,
                              66,
                              1368,
                              1369,
                              1436,
                              306,
                              1411,
                              175,
                              1469,
                              146,
                              1408,
                              177,
                              1449,
                              39,
                              36,
                              1437,
                              1438,
                              1479,
                              144,
                              1367,
                              1373,
                              1398,
                              1399,
                              257,
                              258,
                              259,
                              1397,
                              1508,
                              1509,
                              1557,*/
                            150
                        ],
                    }
                },
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
                FyHFinal: {
                    [Sequelize.Op.between]: [fechainicioformate, fechafinformat]
                },
                IdAtencion: {
                    [Sequelize.Op.in]: ['187612']
                }/**/
            }
        });

        const dataPlana = paciente.map((data) => {
            console.log(data.FactOrdenServicios.FacturacionServicioFinanciamiento)
            const tipodiagnostico = [];
            const idEmpleadoMedico = data.Medico.IdEmpleado;
            data.FactOrdenServicios.forEach((FacturacionServicioFinanciamiento) => {
                console.log(FacturacionServicioFinanciamiento.FacturacionServicioFinanciamiento.FactCatalogoServicio.Codigo)

                if (FacturacionServicioFinanciamiento.FacturacionServicioFinanciamiento.FactCatalogoServicio.Codigo != '99203' && FacturacionServicioFinanciamiento?.FacturacionServicioFinanciamiento?.FactCatalogoServicio) {
                    tipodiagnostico.push({
                        tipodiagnostico: "D",
                        codigo: FacturacionServicioFinanciamiento.FacturacionServicioFinanciamiento.FactCatalogoServicio.Codigo,
                        tipoitem: "CP",
                        codigolote: "",
                    })
                }
            })
            const codigosUnicos = new Set();
            data.AtencionesDiagnosticos.forEach((diagnostico) => {
                const codigo = diagnostico.Diagnostico?.codigoCIEsinPto.trim();
                if (codigo && !codigosUnicos.has(codigo)) {
                    codigosUnicos.add(codigo);
                    tipodiagnostico.push({
                        tipodiagnostico: diagnostico.SubclasificacionDiagnostico?.Codigo,
                        codigo: diagnostico.Diagnostico?.codigoCIEsinPto.trim(),
                        tipoitem: "CX",
                        codigolote: "",
                    });
                }


                if (diagnostico.labConfHIS != null) {
                    // Encuentra el elemento en tipodiagnostico con el código actual
                    const item = tipodiagnostico.find(item => item.codigo === codigo);
                    if (item) {
                        // Si item ya tiene un lastItem, simplemente agregamos el nuevo labConfHIS
                        if (!item.labs) {
                            item.labs = [];
                        }
                        item.labs.push({
                            codigo: "",
                            valor: diagnostico.labConfHIS.trim()
                        });
                    }
                }


            });
            return {
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita : "",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha : "",
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
                    edadregistro: data.Paciente?.edadregistro.toString(),
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
                        peso: data.triaje?.TriajePeso ? data.triaje?.TriajePeso : "",
                        talla: data.triaje?.TriajeTalla ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
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
        // res.status(200).json(paciente)
        res.status(200).json(dataPlana)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}




const findByFechasPrueba2 = async (req, res = response) => {
    try {
        let fechafin2 = moment(req.body.end, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
        const fechafinformat = fechafin2.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        let fechainicio2 = moment(req.body.start, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        const fechainicioformate = fechainicio2.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

        const paciente = await atenciones.findAll({
            include: [
                his_cuenta_cita,
                {
                    model: atencionesCE,
                },
                {
                    model: Servicios,
                    where: {

                        IdServicio: [
                            37,
                            1407,
                            160,
                            1363,
                            1365,
                            1410,
                            1349,
                            174,
                            1556,
                            169,
                            1364,
                            1366,
                            178,
                            1524,
                            140,
                            1468,
                            1373,
                            163,
                            162,
                            1533,
                            1534,
                            328,
                            1412,
                            1515,
                            143,
                            246,
                            1409,
                            35,
                            1561,
                            1520,
                            66,
                            1368,
                            1369,
                            1436,
                            306,
                            1411,
                            175,
                            1469,
                            146,
                            1408,
                            177,
                            1449,
                            39,
                            36,
                            1437,
                            1438,
                            1479,
                            144,
                            1367,
                            1373,
                            1398,
                            1399,
                            257,
                            258,
                            259,
                            1397,
                            1508,
                            1509,
                            1557,                            
                            1402,
                            170,
                            1385,
                            1522,
                            68,
                            1356,
                            150,
                        ],
                    }
                },
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
                FyHFinal: {
                    [Sequelize.Op.between]: [fechainicioformate, fechafinformat]
                },
                /* IdAtencion: {
                     [Sequelize.Op.in]: ['187612']
                 }*/
            }
        });


        const dataPlana = paciente.map((data) => {
            const tipodiagnostico = [];
            const idEmpleadoMedico = data.Medico.IdEmpleado;
            data.FactOrdenServicios.forEach((FacturacionServicioFinanciamiento) => {
                if(idEmpleadoMedico===FacturacionServicioFinanciamiento.IdUsuario){
                FacturacionServicioFinanciamiento.FacturacionServicioFinanciamientos.forEach((data) => {
                    data.FactCatalogoServicios.forEach((data) => {
                        if (data.Codigo != '99203') {
                            tipodiagnostico.push({
                                tipodiagnostico: "D",
                                codigo: data.Codigo,
                                tipoitem: "CP",
                                codigolote: "",
                            })
                        }
                    })
                })}
            })
            const codigosUnicos = new Set();
            data.AtencionesDiagnosticos.forEach((diagnostico) => {
                const codigo = diagnostico.Diagnostico?.codigoCIEsinPto.trim();
                if (codigo && !codigosUnicos.has(codigo)) {
                    codigosUnicos.add(codigo);
                    tipodiagnostico.push({
                        tipodiagnostico: diagnostico.SubclasificacionDiagnostico?.Codigo,
                        codigo: diagnostico.Diagnostico?.codigoCIEsinPto.trim(),
                        tipoitem: "CX",
                        codigolote: "",
                    });
                }


                if (diagnostico.labConfHIS != null) {
                    const item = tipodiagnostico.find(item => item.codigo === codigo);
                    if (item) {
                        if (!item.labs) {
                            item.labs = [];
                        }
                        item.labs.push({
                            codigo: "",
                            valor: diagnostico.labConfHIS.trim()
                        });
                    }
                }


            });
            return {
                idcita: data.his_cuenta_citum ? data.his_cuenta_citum?.idcita : "",
                fechaRegistro: data.his_cuenta_citum ? data.his_cuenta_citum?.fecha : "",
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
                    edadregistro: data.Paciente?.edadregistro.toString(),
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
                        peso: data.triaje?.TriajePeso ? data.triaje?.TriajePeso : "",
                        talla: data.triaje?.TriajeTalla ? data.triaje?.TriajeTalla : "",
                        hemoglobina: "",
                        perimetrocefalico: "",
                        perimetroabdominal: "",
                    }
                },
                personal_registra: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
                    idcondicion: data.Medico?.Empleado.IdCondicionTrabajoFormated.toString(),
                },
                personal_atiende: {
                    nrodocumento: data.Medico?.Empleado.DNI ? data.Medico?.Empleado.DNI.trim() : "",
                    apematerno: data.Medico?.Empleado.ApellidoMaterno,
                    idpais: data.Medico?.Empleado.Paise ? data.Medico?.Empleado.Paise.Codigo : "PER",
                    idprofesion: data.Medico?.Empleado.TiposEmpleado.TipoEmpleadoHIS,
                    fechanacimiento: data.Medico?.Empleado.FechaNacimientoFormattedMedico,
                    nombres: data.Medico?.Empleado.Nombres.trim(),
                    idtipodoc: data.Medico?.Empleado.idTipoDocumentoformated.toString(),
                    apepaterno: data.Medico?.Empleado.ApellidoPaterno,
                    idsexo: data.Medico?.Empleado.TiposSexo ? data.Medico?.Empleado.TiposSexo.Descripcion.charAt(0).toUpperCase() : "M",
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
        res.status(200).json(dataPlana)
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}


module.exports = {
    findAll,
    findByFechas,
    enviarhis,
    ver,
    findByFechasTotal,
    enviarApiHisData,
    findByFechasPrueba,
    enviarhisprueba,
    findByFechasPrueba2
}
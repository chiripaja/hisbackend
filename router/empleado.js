// host + /api/empleado

const { Router } = require('express')
const { AuthEmpleado } = require('../controller/EmpleadoController')

const router=Router()

router.post('/auth',AuthEmpleado)

module.exports=router

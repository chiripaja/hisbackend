// host + /api/his
const { Router } = require('express')
const { findAll, enviarhis, findByFechas, ver,findByFechasTotal, enviarApiHisData, findByFechasPrueba, enviarhisprueba, findByFechasPrueba2 } = require('../controller/hisController')
const router=Router()

router//.get('/',findAll)

       .post('/findByFechas',findByFechasPrueba2)//prueba
     //.post('/findByFechas',findByFechas)//produccion
      //.post('/findByFechas',findByFechasTotal)

     // .post('/',enviarhisprueba)//prueba
      .post('/',enviarhis)//produccion
      .get('/ver',ver)
      .post('/enviarApiHisData',enviarApiHisData)
      
module.exports = router
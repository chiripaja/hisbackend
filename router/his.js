// host + /api/his
const { Router } = require('express')
const { findAll, enviarhis, findByFechas, ver,findByFechasTotal, enviarApiHisData } = require('../controller/hisController')
const router=Router()

router.get('/',findAll)
      .post('/findByFechas',findByFechas)
      //.post('/findByFechas',findByFechasTotal)
      .post('/',enviarhis)
      .get('/ver',ver)
      .post('/enviarApiHisData',enviarApiHisData)
      
module.exports = router
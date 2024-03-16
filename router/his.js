// host + /api/his
const { Router } = require('express')
const { findAll, enviarhis, findByFechas } = require('../controller/hisController')
const router=Router()

router.get('/',findAll)
      .post('/findByFechas',findByFechas)
      .post('/',enviarhis)
      
module.exports = router
const express = require('express')
const app = express()
const port = 4000
//const portproxy =4001
//const cors_proxy  = require('cors-anywhere');
const cors = require('cors');

app.use(cors())
app.use(express.static('public'))


app.use(express.json())
app.use(express.static('public'))
app.use('/api/his',require('./router/his'))
app.use('/api/empleado',require('./router/empleado'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})

/*
cors_proxy.createServer({
  originWhitelist: [], // Change to allow specific origins or set to ['*'] for all
  removeHeaders: ['cookie', 'cookie2'] // Optional: remove headers you don't want to forward
}).listen(portproxy, () => {
  console.log(`Example app listening on port ${portproxy}`)
})*/
const express = require('express')
const initDB = require('./config/db')
const app = express()

const port = 3001

app.listen(port, () => {
    console.log('Ejecutando aplicacion')
})

initDB()
var express = require('express')
var app = express()
var port = 3000

app.get('/', function (req, res) {
  res.send('Hola Dummies!')
})

// mostrar archivos estaticos
// http://localhost:3000/estaticos
app.use('/estaticos', express.static('dist'))


app.listen(port, function () {
  console.log(`Servidor ExpressJS corriendo en el puerto ${port}`)
})
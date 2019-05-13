var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//   res.send('Hola Dummies!')
// })

// mostrar archivos estaticos
// http://localhost:3000/estaticos
// app.use('/estaticos', express.static('dist'))

// acceso para validar el inicio de sesion
// http://localhost:3000/api/login
app.post("/api/login", (req, res) => {
  let user = req.body.user;
  let password = req.body.password;

  if (user == "bidkar" && password == "123") {
    console.log("usuario y contraseña correctos");
    res.send(true);
  } else {
    console.log("inicio de sesión inválido");
    res.send(false);
  }
});

app.listen(port, function() {
  console.log(`Servidor ExpressJS corriendo en el puerto ${port}`);
});

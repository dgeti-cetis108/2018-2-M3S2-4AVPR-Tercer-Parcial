const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();
const app = express();
const port = 3000;

// crear o utilizar la base de datos
const db = crearConectarDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// acceso para validar el inicio de sesion
// http://localhost:3000/api/login
app.post("/api/login", (req, res) => {
  let user = req.body.user;
  let password = req.body.password;

  login(user, password, res);
});

// ruta para crear nuevo usuario
app.post("/api/user/new", (req, res) => {});

// ruta para validar la existencia del nombre de usuario
app.post("/api/user/validate/name", async (req, res) => {
  let username = req.body.user;
  let rst = await validateUserName(username);
  console.log(`valor de rst = ${rst}`);
  res.send(rst);
});

// ruta para validar la existecia del correo electronico
app.post("/api/user/validate/email", (req, res) => {});

app.listen(port, function() {
  console.log(`Servidor ExpressJS corriendo en el puerto ${port}`);
});

function login(user, password, res) {
  let query = `SELECT id,name,firstname,lastname,email
               FROM users WHERE name=? and password=?`;
  db.get(query, [user, password], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    if (row) {
      res.json(row);
    } else {
      res.send(false);
    }
  });
}

function crearConectarDb() {
  return new sqlite.Database("db/cetis108.db", err => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado correctamente a la base de datos");
  });
}

function validateUserName(username) {
  return new Promise((resolve, reject) => {
    let query = `SELECT count(id) as 'total' FROM users where name=?`;
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      }
      console.log(`row dentro de db.get = ${row}`);
      resolve(row); // { total: 1 }
    });
  });
}

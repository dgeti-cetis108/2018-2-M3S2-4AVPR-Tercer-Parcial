const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();
const app = express();
const port = 3000;

// crear o utilizar la base de datos
const db = crearConectarDb();

// crear la tabla users
// createTableUsers();

// insertar un registro de usuario
// insertNewUser();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// acceso para validar el inicio de sesion
// http://localhost:3000/api/login
app.post("/api/login", (req, res) => {
  let user = req.body.user;
  let password = req.body.password;

  login(user, password, res);

  // if (user == "bidkar" && password == "123") {
  //   console.log("usuario y contraseña correctos");
  //   res.send(true);
  // } else {
  //   console.log("inicio de sesión inválido");
  //   res.send(false);
  // }
});

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
    }
    else {
      res.send(false);
    }
  });
}

function insertNewUser() {
  db.run(
    "INSERT INTO users (name,password,firstname,lastname,email) values (?,?,?,?,?)",
    ["bidkar", "123", "Bidkar", "Aragon", "bidkar@cetis108.edu.mx"]
  );
}

function createTableUsers() {
  db.run(`CREATE TABLE users (
  id integer primary key autoincrement,
  name varchar(12) not null unique,
  password varchar(200) not null,
  firstname varchar(50) not null,
  lastname varchar(50) not null,
  email varchar(200) not null unique,
  remember_token varchar(200) default null
)`);
}

function crearConectarDb() {
  return new sqlite.Database("db/cetis108.db", err => {
    if (err) {
      console.error(err.message);
    }
    console.log("Conectado correctamente a la base de datos");
  });
}

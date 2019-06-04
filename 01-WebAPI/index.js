const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// crear o utilizar la base de datos
const db = crearConectarDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// acceso para validar el inicio de sesion
// http://localhost:3000/api/login
app.post("/api/user/login", (req, res) => {
  let user = req.body.user_name;
  let password = req.body.user_password;

  login(user, password, res);
});

// ruta para crear nuevo usuario
app.post("/api/user/new", async (req, res) => {
  let user = {};
  user.name = req.body.username;
  user.password = req.body.userpassword;
  user.firstname = req.body.userfirstname;
  user.lastname = req.body.userlastname;
  user.email = req.body.useremail;

  await saveNewUser(user);
  res.send({ isSaved: true });
});

// ruta para validar la existencia del nombre de usuario
app.post("/api/user/validate/name", async (req, res) => {
  let username = req.body.user;
  let rst = await validateUserName(username);
  if (rst.total == 1) {
    res.send({ isValid: false });
  } else {
    res.send({ isValid: true });
  }
});

// ruta para validar la existecia del correo electronico
app.post("/api/user/validate/email", async (req, res) => {
  let useremail = req.body.email;
  let rst = await validateUserEmail(useremail);
  if (rst.total == 1) {
    res.send({ isValid: false });
  } else {
    res.send({ isValid: true });
  }
});
// ruta para editar el perfil
app.post("/api/user/profile/edit", async (req, res) => {
  let user = {};
  user.id = req.body.user_id;
  user.firstname = req.body.user_firstname;
  user.lastname = req.body.user_lastname;
  user.email = req.body.user_email;
  try {
    await saveUserChanges(user, res);
  } catch (error) {
    console.log(error);
    res.send({ isDataSaved: null });
  }
});

// ruta para cambiar contraseña
app.post("/api/user/save/newpassword", async (req, res) => {
  let user = {};
  user.id = req.body.user_id;
  user.newpassword = req.body.user_newpassword;
  try {
    await changeUserPassword(user, res);
  } catch (error) {
    console.log(error);
    res.send({ isDataSaved: null });
  }
});

app.listen(port, function() {
  console.log(`Servidor ExpressJS corriendo en el puerto ${port}`);
});

function changeUserPassword(user, res) {
  return new Promise((resolve, reject) => {
    let query = "UPDATE users SET password=? WHERE id=?";
    db.run(query, [user.newpassword, user.id], function(err) {
      if (err) {
        reject(err.message);
      }
      resolve(this.changes);
    });
  }).then(val => {
    if (val > 0) {
      res.send({ isDataSaved: true });
    } else {
      res.send({ isDataSaved: false });
    }
  });
}

function saveUserChanges(user, res) {
  return new Promise((resolve, reject) => {
    let query = "UPDATE users SET firstname=?, lastname=?, email=? WHERE id=?";
    db.run(
      query,
      [user.firstname, user.lastname, user.email, user.id],
      function(err) {
        if (err) {
          reject(err.message);
        }
        resolve(this.changes);
      }
    );
  }).then(val => {
    if (val > 0) {
      res.send({ isDataSaved: true });
    } else {
      res.send({ isDataSaved: false });
    }
  });
}

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
  return new Promise(resolve => {
    let query = `SELECT count(id) as 'total' FROM users where name=?`;
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row);
      resolve(row); // true: { total: 1 }  false: undefined
    });
  });
}

function validateUserEmail(useremail) {
  return new Promise(resolve => {
    let query = `SELECT count(id) as 'total' FROM users where email=?`;
    db.get(query, [useremail], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resolve(row); // true: { total: 1 }  false: undefined
    });
  });
}

function saveNewUser(user) {
  return new Promise(resolve => {
    let query = `INSERT INTO users (name,password,firstname,lastname,email) VALUES (?,?,?,?,?)`;
    db.run(
      query,
      [user.name, user.password, user.firstname, user.lastname, user.email],
      err => {
        if (err) {
          console.error(err.message);
        }
        resolve();
      }
    );
  });
}

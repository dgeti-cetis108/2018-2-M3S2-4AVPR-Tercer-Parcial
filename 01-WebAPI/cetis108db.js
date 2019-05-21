// crear la tabla users
// createTableUsers();

// insertar un registro de usuario
// insertNewUser();

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
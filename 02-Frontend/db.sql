CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  cellphone VARCHAR(30) DEFAULT NULL,
  password VARCHAR(300) NOT NULL,
  remember_token VARCHAR(200) DEFAULT NULL,
  status INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT NULL
);

INSERT INTO users (firstname,lastname,email,password)
values ('Bidkar', 'Aragon', 'bidkar@aragon','123');

SELECT * FROM users;
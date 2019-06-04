const express = require("express");
const app = express();
const port = 5000;

app.use(express.static("src"));

app.listen(port, () => console.log(`Servidor para frontend en puerto ${port}`));

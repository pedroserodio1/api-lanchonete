const express = require("express");
const routes = require("./routes");
const app = express();

//Rotas
routes(app, express);


app.listen(3000, () => {
    console.log("Servidor on");
});
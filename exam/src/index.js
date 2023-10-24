const express = require("express");
const { expressConfig } = require("./config/expressConfig");
const { handlebarsConfig } = require("./config/handlebarsConfig");
const dbConnection = require("./config/dbConfig");
const { PORT } = require("./constants");
const routes = require("./router");

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(routes);

dbConnection()
  .then(() => console.log("Successfuly connected to db"))
  .catch((err) => console.log(`Error while connecting to db: ${err}`));

app.listen(PORT, () => console.log(`Server is listening ot port:${PORT}`));

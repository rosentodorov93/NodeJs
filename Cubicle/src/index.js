const express = require("express");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const connectDb = require("./config/mongooseConfig");

const routes = require("./router");
const { PORT } = require("./constants");

const app = express();
expressConfig(app);
handlebarsConfig(app);

connectDb()
  .then(() => {
    console.log("Successsfuly connected to database");
  })
  .catch((error) => {
    console.log(`Error while connecting to db: ${error}`);
  });

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

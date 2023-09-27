const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const routes = require('./router');

const port = 5050;


const app = express();
expressConfig(app);
handlebarsConfig(app);


app.use(routes);

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));
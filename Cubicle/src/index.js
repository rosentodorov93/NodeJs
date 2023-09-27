const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const port = 5050;


const app = express();
expressConfig(app);
handlebarsConfig(app);


app.get('/', (req, res) =>{
    res.send("Hello from server!");
})

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));
const express = require('express');
const app = express();
const port = 5050;

app.get('/', (req, res) =>{
    res.send("Hello from server!");
})

app.listen(port, ()=> console.log(`Server is listening on port ${port}`));
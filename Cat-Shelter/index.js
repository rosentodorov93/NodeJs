const http = require("http");
const fs = require("fs/promises");
const url = require("url");
const qs = require("querystring");
const handlers = require('./handlers/index');
const port = 5050;

const server = http.createServer(async (req, res) => {
  for(let handler of handlers){
    const result = await handler(req,res);
    // if(result == true){
    //     console.log('break')
    //     break;
    // }
  }
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));

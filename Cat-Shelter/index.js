const http = require('http');
const url = require('url');
const port = 5050;

const server = http.createServer((req,res)=>{
    console.log(url.parse(req['url']).pathname);

    res.write('Hello from server')
    res.end();
});

server.listen(port, ()=> console.log(`Server is listening on port ${port}`));
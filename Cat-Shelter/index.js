const http = require('http');
const fs = require('fs/promises');
const url = require('url');
const { log } = require('console');
const port = 5050;

const server = http.createServer(async(req,res)=>{
    const {url} = req;

    if(url === '/'){
        res.writeHead(200,{
            'Content-Type': 'text/html',
        });

        const homeTemplate = await fs.readFile('./views/home/index.html', 'utf8');
        res.write(homeTemplate);
    }
    else if( url === '/content/styles/site.css'){
        res.writeHead(200,{
            'Content-Type': 'text/css',
        });

        const siteCss = await fs.readFile('./content/styles/site.css', 'utf8');
        res.write(siteCss);
    }

    res.end();
});

server.listen(port, ()=> console.log(`Server is listening on port ${port}`));
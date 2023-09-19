const url = require('url');
const fs = require('fs/promises');
const path = require('path');


function getContentType(url){
    if(url.endsWith('css')){
        return 'text/css';
    }else if(url.endsWith('html')){
        return 'text/html';
    }else if(url.endsWith('js')){
        return 'text/javascript';
    }else{
        return 'tesxt/plain'
    }
}

module.exports = async (req,res) => {
    const pathName = url.parse(req.url).pathname;

    if(pathName.startsWith('/content') && req.method === 'GET'){

        const filePath = `.${pathName}`;
        console.log('here');
        const data = await fs.readFile(filePath, 'utf8');

        if(!data){
            res.writeHead(400, {
                "Content-Type": "text/plain"
            })
            res.write("400 Not Found");
            res.end();
            return;
        }

        res.writeHead(200, {
            "Content-Type": getContentType(pathName),
        })
        res.write(data);
        res.end();

    }else{
        return true;
    }
}
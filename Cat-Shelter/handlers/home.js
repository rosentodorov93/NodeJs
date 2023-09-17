const url = require('url');
const fs = require('fs/promises');
const path = require('path');
const cats = require('../data/cats');


module.exports = async (req,res) =>{
    const pathName = url.parse(req.url).pathname;

    if(pathName === '/' && req.method === 'GET'){
        const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'))
        const data = await fs.readFile(filePath, 'utf8');
        if(!data){
            res.writeHead(400, {
                "Content-Type": "text/plain"
            })
            res.write("400 Not Found")
            res.end();
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write(data);
        res.end();
        console.log('end')

    }else{
        return true;
    }
}
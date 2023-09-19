const url = require('url');
const fs = require('fs/promises');
const path = require('path');
const cats = require('../data/cats');

const replaceData = (html,data) =>{
    return Object.keys(data).reduce((result, prop) =>{
        result = result.replaceAll(`{{${prop}}}`, data[prop]);
        return result;
    },html)
}

module.exports = async (req,res) =>{
    const pathName = url.parse(req.url).pathname;

    if(pathName === '/' && req.method === 'GET'){

        const homeTemplatePath = path.normalize(path.join(__dirname, '../views/home/index.html'))
        const catTemplatePath = path.normalize(path.join(__dirname, '../views/home/catTemplate.html'))
        const catDataPath = path.normalize(path.join(__dirname, '../data/cats.json'))

        const data = await fs.readFile(homeTemplatePath, 'utf8');
        if(!data){
            res.writeHead(400, {
                "Content-Type": "text/plain"
            })
            res.write("400 Not Found")
            res.end();
            return;
        }

        const catTamplate = await fs.readFile(catTemplatePath, 'utf8');
        const catsData = await fs.readFile(catDataPath, 'utf8');
        const cats = JSON.parse(catsData);
        console.log(cats);

        const catsHtml = cats.map(cat => replaceData(catTamplate, cat));
        const homeTemplate = replaceData(data, {cats: catsHtml});
        console.log(catsHtml);

        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write(homeTemplate);
        res.end();

    }else{
        return true;
    }
}
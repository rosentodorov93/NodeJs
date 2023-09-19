const url = require("url");
const fs = require("fs/promises");
const qs = require("querystring");
const path = require("path");
const replaceData = require("../utils/replaceData");

module.exports = async (req, res) => {
  const pathName = url.parse(req.url).pathname;
  const searchQuery = url.parse(req.url).search;
  let searchWord = null; 
  if(searchQuery != null){
    searchWord = searchQuery.split('=')[1];
  }
  console.log(searchWord);

  if (pathName === "/" && req.method === "GET") {
    const homeTemplatePath = path.normalize(
      path.join(__dirname, "../views/home/index.html")
    );
    const catTemplatePath = path.normalize(
      path.join(__dirname, "../views/home/catTemplate.html")
    );
    const catDataPath = path.normalize(
      path.join(__dirname, "../data/cats.json")
    );

    const data = await fs.readFile(homeTemplatePath, "utf8");
    if (!data) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.write("400 Not Found");
      res.end();
      return;
    }

    const catTamplate = await fs.readFile(catTemplatePath, "utf8");
    const catsData = await fs.readFile(catDataPath, "utf8");
    let cats = JSON.parse(catsData);
    if (searchWord) {
      cats = cats.filter((cat) => cat.name.toLowerCase().includes(searchWord.toLowerCase()));
    }

    const catsHtml = cats.map((cat) => replaceData(catTamplate, cat));
    const homeTemplate = replaceData(data, { cats: catsHtml });

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(homeTemplate);
    res.end();
  } else {
    return true;
  }
};

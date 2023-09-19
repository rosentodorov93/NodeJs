const url = require("url");
const fs = require("fs/promises");
const path = require("path");
const qs = require("querystring");
const breeds = require("../data/breeds.json");
const replaceData = require("../utils/replaceData");
const cats = require("../data/cats");

module.exports = async (req, res) => {
  const pathName = url.parse(req.url).pathname;

  if (pathName === "/cats/add-cat" && req.method === "GET") {
    const filePath = path.normalize(
      path.join(__dirname, "../views/addCat.html")
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const breedsTemplate = breeds.map(
      (breed) => `<option value=${breed}>${breed}</option>`
    );
    const addCatTemplate = (await fs.readFile(filePath, "utf8")).replace(
      "{{catBreeds}}",
      breedsTemplate
    );
    res.write(addCatTemplate);
    res.end();
  } else if (pathName === "/cats/add-cat" && req.method === "POST") {
    let formData = "";
    req.on("data", (data) => {
      formData += data;
    });

    req.on("end", async () => {
      const filePath = path.normalize(
        path.join(__dirname, "../data/cats.json")
      );
      const body = qs.decode(formData);
      console.log(body);

      const data = await fs.readFile(filePath, "utf8");
      if (!data) {
        throw error("Unexpected error");
      }

      let cats = JSON.parse(data);
      cats.push({
        id: cats.length + 1,
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        breed: body.breed,
      });
      const result = JSON.stringify(cats);
      await fs.writeFile(filePath, result, "utf8");
      res.writeHead(301, { location: "/" });
      res.end();
    });
  } else if (pathName === "/cats/add-breed" && req.method === "GET") {
    const filePath = path.normalize(
      path.join(__dirname, "../views/addBreed.html")
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const addBreedTemplate = await fs.readFile(filePath, "utf8");

    res.write(addBreedTemplate);
    res.end();
  } else if (pathName === "/cats/add-breed" && req.method === "POST") {
    let formData = "";
    req.on("data", (data) => {
      formData += data;
    });

    req.on("end", async () => {
      const filePath = path.normalize(
        path.join(__dirname, "../data/breeds.json")
      );
      let body = qs.parse(formData);
      console.log(body);

      const data = await fs.readFile(filePath, "utf8");

      if (!data) {
        throw error("Unexpected error");
      }

      let breeds = JSON.parse(data);
      breeds.push(body.breed);
      console.log(breeds);
      let result = JSON.stringify(breeds);

      await fs.writeFile(filePath, result, "utf-8");
    });
    res.writeHead(301, { location: "/" });
    res.end();
  } else if (pathName.includes("/cats-edit") && req.method === "GET") {
    const editCatTemplatePath = path.normalize(
      path.join(__dirname, "../views/editCat.html")
    );

    const catId = pathName.slice(pathName.lastIndexOf("/") + 1);
    const cat = cats[catId - 1];
    const editCatTemplate = await fs.readFile(editCatTemplatePath, "utf-8");
    const breedsTemplate = breeds.map(
      (breed) => `<option value=${breed}>${breed}</option>`
    );
    const modifiedEditTemplate = replaceData(editCatTemplate, cat).replace(
      "{{catBreeds}}",
      breedsTemplate
    );

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(modifiedEditTemplate);
    res.end();
  } else if (pathName.includes("/cat-edit") && req.method === "POST") {
    let formData = "";
    req.on("data", (data) => {
      formData += data;
    });
    req.on("end", async () => {
      const catsPath = path.normalize(
        path.join(__dirname, "../data/cats.json")
      );
      const body = qs.decode(formData);

      const catId = pathName.slice(pathName.lastIndexOf("/") + 1);

      cats[catId - 1].name = body.name;
      cats[catId - 1].imageUrl = body.imageUrl;
      cats[catId - 1].description = body.description;
      cats[catId - 1].breed = body.breed;

      const result = JSON.stringify(cats);
      await fs.writeFile(catsPath, result, "utf-8");

      res.writeHead(301, { location: "/" });
      res.end();
    });
  } else if (pathName.includes("/cats-new-home") && req.method === "GET") {
    const shelterCatTemplatePath = path.normalize(
      path.join(__dirname, "../views/catShelter.html")
    );

    const catId = pathName.slice(pathName.lastIndexOf("/") + 1);
    const cat = cats[catId - 1];
    const shelterCatTemplate = await fs.readFile(
      shelterCatTemplatePath,
      "utf-8"
    );
    const modifiedShelterTemplate = replaceData(shelterCatTemplate, cat);

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(modifiedShelterTemplate);
    res.end();
  } else if (pathName.includes("/cats-new-home") && req.method === "POST") {
    const catsPath = path.normalize(path.join(__dirname, "../data/cats.json"));
    const catId = pathName.slice(pathName.lastIndexOf("/") + 1);
    console.log(cats);
    const newCats = cats.filter((cat) => cat.id != catId);
    //console.log(newCats);

    const result = JSON.stringify(newCats);

    await fs.writeFile(catsPath, result, "utf-8");

    res.writeHead(301, { location: "/" });
    res.end();
  }
};

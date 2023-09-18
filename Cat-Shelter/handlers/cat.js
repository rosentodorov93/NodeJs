const url = require("url");
const fs = require("fs/promises");
const path = require("path");
const qs = require("querystring");
const breeds = require("../data/breeds.json");
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
  }
};

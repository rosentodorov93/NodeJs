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

//   
//   } else if (url === "/cats/add-breed" && req.method === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const addBreedTemplate = await fs.readFile("./views/addBreed.html", "utf8");
//     res.write(addBreedTemplate);
//   } else if (url === "/cats/add-breed" && req.method === "POST") {
//     let formData = "";

//     req.on("data", (data) => {
//       formData += data;
//     });

//     req.on("end", async () => {
//       let body = qs.parse(formData);
//       console.log(body);

//       const data = await fs.readFile("./data/breeds.json", "utf8");

//       if (!data) {
//         throw error("Unexpected error");
//       }

//       let breeds = JSON.parse(data);
//       breeds.push(body.breed);
//       console.log(breeds);
//       let result = JSON.stringify(breeds);

//       await fs.writeFile("./data/breeds.json", result, "utf-8");
//     });
//     res.writeHead(301, { location: "/" });
//     res.end();
//   } else if (url === "/cats/add-cat") {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const addBreedTemplate = await fs.readFile("./views/addCat.html", "utf8");
//     res.write(addBreedTemplate);
//   } else if (url === "/content/styles/site.css") {
//     res.writeHead(200, {
//       "Content-Type": "text/css",
//     });

//     const siteCss = await fs.readFile("./content/styles/site.css", "utf8");
//     res.write(siteCss);
//   }

//   res.end();
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));

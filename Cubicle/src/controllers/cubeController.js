const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accesoryService = require("../services/accesoryService");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });

  res.redirect('/');
});

router.get("/details/:cubeId", async(req, res) =>{
    const {cubeId} = req.params;
    const cube = await cubeService.getById(cubeId);
    console.log(cube);

    res.render('details', {cube});
})

router.get('/attach-accesory/:cubeId', async (req, res) =>{
    const {cubeId} = req.params;
    
    const cube = await cubeService.getById(cubeId).lean();
    const accesories = await accesoryService.getAvaliableAccesories(cube.accesories).lean();
    console.log(accesories);
    const canAttachAccesory = accesories.length > 0;

    res.render('accesory/attach', {cube, accesories, canAttachAccesory});
})

module.exports = router;

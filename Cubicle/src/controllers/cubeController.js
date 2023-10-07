const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accesoryService = require("../services/accesoryService");

router.get("/create", (req, res) => {
  res.render("cube/create");
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
    const cube = await cubeService.getById(cubeId).lean();
    const hasAccesories = cube.accesories.length > 0;

    res.render('cube/details', {cube, hasAccesories});
})

router.get('/attach-accesory/:cubeId', async (req, res) =>{
    const {cubeId} = req.params;
    
    const cube = await cubeService.getById(cubeId).lean();
    const accesories = await accesoryService.getAvaliableAccesories(cube.accesories).lean();
    const canAttachAccesory = accesories.length > 0;

    res.render('accesory/attach', {cube, accesories, canAttachAccesory});
})

router.post('/attach-accesory/:cubeId', async (req, res) =>{
    const { accessory: accesoryId } = req.body;
    const {cubeId} = req.params;

    await cubeService.attachAccesory(cubeId, accesoryId);

    res.redirect(`/cubes/details/${cubeId}`);
})

module.exports = router;

const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accesoryService = require("../services/accesoryService");
const {difficultyLevelViewData} = require('../util/difficultyLevelViewData');

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
    owner: req.user
  });

  res.redirect('/');
});

router.get("/details/:cubeId", async(req, res) =>{
    const {cubeId} = req.params;
    const cube = await cubeService.getById(cubeId).lean();

    const isOwner = cube.owner?.toString() === req.user._id;
    const hasAccesories = cube.accesories.length > 0;

    res.render('cube/details', {cube, hasAccesories, isOwner});
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

router.get('/edit/:cubeId', async(req,res) =>{
  const {cubeId} = req.params;
  const cube = await cubeService.getById(cubeId).lean();

  if (cube.owner?.toString() !== req.user._id) {
    return res.redirect("/404");
  }

  const difficultyLevelOptions = difficultyLevelViewData(cube.difficultyLevel);
  res.render('cube/edit', {cube, difficultyLevelOptions})
})

router.post('/edit/:cubeId', async(req, res) =>{
  const {cubeId} = req.params;
  const { name, imageUrl, difficultyLevel, description } = req.body;
  const data = { name, imageUrl, difficultyLevel, description };
  
  await cubeService.edit(cubeId, data)
  res.redirect(`/cubes/details/${cubeId}`)
})

router.get('/delete/:cubeId', async(req,res) =>{
  const {cubeId} = req.params;
  const cube = await cubeService.getById(cubeId).lean();

  if (cube.owner?.toString() !== req.user._id) {
    return res.redirect("/404");
  }

  const difficultyLevelOptions = difficultyLevelViewData(cube.difficultyLevel);
  res.render('cube/delete', {cube, difficultyLevelOptions})
})

router.post('/delete/:cubeId', async(req, res) =>{
  const {cubeId} = req.params;

  await cubeService.delete(cubeId);
  res.redirect('/')
})


module.exports = router;

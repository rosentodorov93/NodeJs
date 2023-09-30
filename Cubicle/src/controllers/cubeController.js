const router = require("express").Router();
const cubeService = require("../services/cubeService");

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

module.exports = router;

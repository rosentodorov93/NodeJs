const router = require("express").Router();
const userService = require("../services/userService");
const {extractErrorMsgs} = require('../util/errorHandler');
const {isAuth} = require('../middlewares/authMiddleware')

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errors = extractErrorMsgs(error)
    res.render('user/login', {errors})
  }
});

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await userService.register({
      username,
      email,
      password,
      repeatPassword,
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");

  } catch (error) {
      const errors = extractErrorMsgs(error)
      res.render('user/register', {errors})
  }
});

router.get('/logout', isAuth, (req, res)=>{
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;

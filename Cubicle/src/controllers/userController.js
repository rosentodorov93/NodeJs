const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../util/errorHandler");

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.login(username, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errors = extractErrorMsgs(error);
    res.render("user/login", { username, password, errors });
  }
});

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userService.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (error) {
    const errors = extractErrorMsgs(error);
    res.render("user/register", { errors });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;

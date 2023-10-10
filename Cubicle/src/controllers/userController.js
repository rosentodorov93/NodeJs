const router = require("express").Router();
const userService = require('../services/userService');


router.get('/login', (req, res) =>{
    res.render("user/login");
})

router.post('/login', async (req,res)=>{
    const {username, password} = req.body;

    const token = await userService.login(username, password);

    res.cookie('token', token, {httpOnly: true});
    res.redirect('/')
})

router.get('/register', (req, res) =>{
    res.render("user/register");
})

router.post('/register', async (req, res) =>{
    const {username, password, repeatPassword} = req.body;

    if(password !== repeatPassword){
        res.redirect('/users/register')
    }

    await userService.register(username, password);

    res.redirect('/users/login')
})

module.exports = router;
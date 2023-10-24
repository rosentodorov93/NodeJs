const router = require('express').Router();
const electronicsService = require('../services/electronicsService');
const {usAuth, isAuth} = require('../middlewares/authMiddleware')

router.get('/', (req,res)=>{
    res.render('home');
})

router.get('/search', isAuth, async (req,res) =>{
    const {name, type} = req.query

    let electronics = await electronicsService.search(name, type).lean();

    if(electronics == undefined){
        electronics = await electronicsService.getAll().lean();
    }

    res.render('search', {electronics});
})


module.exports = router;
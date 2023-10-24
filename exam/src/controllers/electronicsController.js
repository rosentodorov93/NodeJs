const router = require('express').Router();
const electronicsService = require('../services/electronicsService');
const {isAuth} = require('../middlewares/authMiddleware');
const {extractErrorMsgs} = require('../util/errorHandler');

router.get('/create', isAuth, (req,res)=>{
    res.render('electronics/create')
})

router.post('/create', isAuth, async(req,res)=>{
    const {name, type, production, exploitation, damages, imageUrl, price, description} = req.body;
    const electronicsData = {
        name, 
        type, 
        production, 
        exploitation, 
        damages, 
        imageUrl, 
        price,
        description,
        owner: req.user,
    }

    try {
        await electronicsService.create(electronicsData);
        res.redirect('/electronics')
    } catch (error) {
        const errors = extractErrorMsgs(error);
        res.render('electronics/create', {errors});
    }

})

router.get('/', async (req,res)=>{
    const electronics = await electronicsService.getAll().lean();

    res.render('electronics/catalog', {electronics});
})

router.get('/details/:electronicsId', async (req,res)=>{
    const {electronicsId} = req.params;

    const electronics = await electronicsService.getById(electronicsId).lean();
    const isOwner = req.user?._id == electronics.owner;
    const hasBought = electronics.buyingList.some(bl => bl._id == req.user?._id);

    res.render('electronics/details', {electronics, isOwner, hasBought})
})

async function checkIsOwner(req, res, next){
    const {electronicsId} = req.params;
    const electronics = await electronicsService.getById(electronicsId).lean();

    if(req.user?._id == electronics.owner){
        res.redirect(`/electronics/details/${electronics._id}`)
    }
    else{
        next();
    }
}

router.get('/buy/:electronicsId', checkIsOwner, async(req,res) =>{
    const {electronicsId} = req.params;

    try {
        await electronicsService.buy(electronicsId, req.user);
        res.redirect(`/electronics/details/${electronicsId}`)
        
    } catch (error) {
        const errors = extractErrorMsgs(error);
        res.render('home', {errors});
    }
})

async function hasPermition(req,res,next){
    const {electronicsId} = req.params;
    const electronics = await electronicsService.getById(electronicsId).lean();

    if(req.user?._id == electronics.owner){
        next();
    }
    else{
        res.redirect(`/electronics/details/${electronics._id}`)
    }
}

router.get('/edit/:electronicsId', hasPermition, async (req,res)=>{
    const {electronicsId} = req.params;
    const electronics = await electronicsService.getById(electronicsId).lean();

    res.render('electronics/edit', {electronics});
})

router.post('/edit/:electronicsId', hasPermition, async (req,res)=>{
    const {electronicsId} = req.params;
    const {name, type, production, exploitation, damages, imageUrl, price, description} = req.body;
    const electronics = {
        name, 
        type, 
        production, 
        exploitation, 
        damages, 
        imageUrl, 
        price,
        description,
        owner: req.user,
    }

    try {
        await electronicsService.edit(electronicsId, electronics)
        res.redirect(`/electronics/details/${electronicsId}`);
    } catch (error) {
        const errors = extractErrorMsgs(error);
        res.render('electronics/edit', { electronics,errors});
    }
})

router.get('/delete/:electronicsId', hasPermition, async (req,res)=>{
    const {electronicsId} = req.params;
    
    try {
        await electronicsService.delete(electronicsId)
        res.redirect(`/electronics`);
    } catch (error) {
        const errors = extractErrorMsgs(error);
        res.render('electronics/catalog', { errors});
    }
})


module.exports = router;
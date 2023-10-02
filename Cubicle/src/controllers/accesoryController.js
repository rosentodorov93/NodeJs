const router = require('express').Router();
const accesoryService = require('../services/accesoryService');

router.get('/create', (req, res) =>{
    res.render('accesory/create');
})

router.post('/create', async (req, res) =>{
    const {name, description, imageUrl} = req.body;
    await accesoryService.create({name, description, imageUrl});

    res.redirect('/');
})

module.exports = router;
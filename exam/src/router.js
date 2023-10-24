const router = require('express').Router();
const homeController = require('./controllers/homeController')
const usersController = require('./controllers/usersController')
const electronicsController = require('./controllers/electronicsController')


router.use(homeController),
router.use('/users', usersController);
router.use('/electronics', electronicsController)

router.get('*', (req,res)=>{
    res.render('404');
})

module.exports = router;
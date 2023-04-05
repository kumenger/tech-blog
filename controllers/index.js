const router = require('express').Router();
const userRoutes=require('./api/userRoutes')
const postRoutes=require('./api/postRoutes')
const commentRoute=require('./api/comment')
const homepageRoutes=require('./homeroutes')

router.use('/user',userRoutes)
router.use('/post',postRoutes)
router.use('/comment',commentRoute)
router.use('/',homepageRoutes)

module.exports=router
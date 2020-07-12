const { create,findAll,userPost,update,editPost } = require('./posts.controllers');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/',checkToken,create);
router.get('/:user_id',checkToken,userPost);
router.get('/',findAll);
router.put('/like/:post_id',update);
router.put('/:post_id',editPost);

module.exports=router;
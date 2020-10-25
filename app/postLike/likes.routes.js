const { request } = require("express");

const { likePost,dislike,likedorNot,CountofLike} = require('./likes.controllers');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/like/:post_id/:user_id',likePost);
router.delete('/dislike/:post_id/:user_id',dislike);
router.get('/check/:post_id/:user_id',likedorNot);
router.get('/count/:post_id',CountofLike);

module.exports = router;
const { request } = require("express");

const { likePost,dislike,likedorNot,CountofLike} = require('./likes.controllers');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/like/:post_id/:user_id',checkToken,likePost);
router.delete('/dislike/:post_id/:user_id',checkToken,dislike);
router.get('/check/:post_id/:user_id',checkToken,likedorNot);
router.get('/count/:post_id',checkToken,CountofLike);

module.exports = router;
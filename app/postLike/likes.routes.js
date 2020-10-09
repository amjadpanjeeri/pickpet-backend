const { request } = require("express");

const { create,dislike,likedorNot} = require('./likes.controllers');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/like/:post_id',create);
router.delete('/dislike/:post_id',dislike);
router.get('/check/:post_id',likedorNot);

module.exports = router;
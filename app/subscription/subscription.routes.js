const { request } = require("express");

const { create,findAll,unfollow,followers ,following} = require('./subscription.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:follower_id',create);
router.get('/:user_id',findAll);
router.delete('/:follower_id',unfollow);
router.get('/follower/count/:user_id',followers);
router.get('/following/count/:user_id',following);

module.exports = router;
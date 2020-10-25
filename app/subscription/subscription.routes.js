const { request } = require("express");

const { followaUser,findAll,unfollow,followers ,following,followingorNot} = require('./subscription.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:user_id/:follower_id',followaUser);
router.get('/:user_id',findAll);
router.delete('/:user_id/:follower_id',unfollow);
router.get('/follower/count/:user_id',followers);
router.get('/following/count/:user_id',following);
router.get('/check/:user_id/:follower_id',followingorNot);


module.exports = router;
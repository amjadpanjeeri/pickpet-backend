const { request } = require("express");

const { create,findAll,unfollow } = require('./subscription.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:follower_id',create);
router.get('/',findAll);
router.delete('/:follower_id',unfollow);

module.exports = router;
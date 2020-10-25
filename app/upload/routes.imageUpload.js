const { request } = require("express");

const { index,profile,viewprofile} = require('./imageUpload');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/uploadImage',index);
router.get('/viewprofile',viewprofile);
router.get('/profile/:id',profile);


module.exports = router;
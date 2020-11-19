const { request } = require("express");

const { index } = require("./post.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/uploadPost", index);

module.exports = router;

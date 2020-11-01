const { request } = require("express");

const { index, profile, viewprofile } = require("./imageUpload");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/uploadImage", checkToken, index);
router.get("/viewprofile", checkToken, viewprofile);
router.get("/profile/:id", checkToken, profile);

module.exports = router;

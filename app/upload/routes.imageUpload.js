const { request } = require("express");

const { index, profile, viewprofile, viewFollowers } = require("./imageUpload");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/uploadImage", checkToken, index);
router.get("/viewprofile", checkToken, viewprofile);
router.get("/profile/:id", profile);
router.get("/followers/:id", viewFollowers);

module.exports = router;

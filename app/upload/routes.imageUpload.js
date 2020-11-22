const { request } = require("express");

const { index, profile, viewprofile, viewFollowers ,profile1} = require("./imageUpload");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.put("/uploadImage", checkToken, index);
router.get("/viewprofile/:user_id", checkToken, viewprofile);
// router.get("/profile/:id", profile);
router.get("/profile/:name", profile);
router.get("/followers/:user_id", viewFollowers);

module.exports = router;

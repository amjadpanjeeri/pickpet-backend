const { request } = require("express");

const {
  editProfile,
  profile,
  viewprofile,
  viewFollowers,
  editImage,
} = require("./imageUpload");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.put("/editProfile", editProfile);
router.put("/editImage/:user_id", editImage);
router.get("/viewprofile/:user_id", checkToken, viewprofile);
// router.get("/profile/:id", profile);
router.get("/profile/:name", profile);
router.get("/followers/:user_id", viewFollowers);

module.exports = router;

const { request } = require("express");

const {
  editProfile,
  profile,
  viewprofile,
  viewFollowers,
  editImage,
  paymentId,
  CompleteProfile,
} = require("./imageUpload");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.put("/editProfile",checkToken, editProfile);
router.put("/CompleteProfile",checkToken, CompleteProfile);
router.put("/editImage/:user_id", editImage);
router.put("/paymentId/:payment_id/:user_id", paymentId);
router.get("/viewprofile/:user_id", viewprofile);
// router.get("/profile/:id", profile);
router.get("/profile/:name", profile);
router.get("/followers/:user_id", viewFollowers);

module.exports = router;

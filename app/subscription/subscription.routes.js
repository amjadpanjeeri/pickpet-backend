const { request } = require("express");

const {
  followaUser,
  findAll,
  unfollow,
  followers,
  following,
  followingorNot,
} = require("./subscription.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/:user_id/:follower_id", checkToken, followaUser);
router.get("/:user_id", checkToken, findAll);
router.delete("/:user_id/:follower_id", checkToken, unfollow);
router.get("/follower/count/:user_id", checkToken, followers);
router.get("/following/count/:user_id", checkToken, following);
router.get("/check/:user_id/:follower_id", checkToken, followingorNot);

module.exports = router;

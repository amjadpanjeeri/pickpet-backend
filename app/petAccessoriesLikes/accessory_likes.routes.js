const { request } = require("express");

const {
  likeAccessory,
  dislikeAccessory,
  likedorNot,
  CountofLike,
} = require("./accessory_likes.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/like/:post_id/:user_id", likeAccessory);
router.delete("/dislike/:post_id/:user_id", dislikeAccessory);
router.get("/check/:post_id/:user_id", likedorNot);
router.get("/count/:post_id", CountofLike);

module.exports = router;

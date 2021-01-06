const { request } = require("express");

const {
  likePetFood,
  dislikePetFood,
  likedorNot,
  CountofLike,
} = require("./foodLikes.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/like/:post_id/:user_id", likePetFood);
router.delete("/dislike/:post_id/:user_id", dislikePetFood);
router.get("/check/:post_id/:user_id", likedorNot);
router.get("/count/:post_id", CountofLike);

module.exports = router;

const {
  create,
  findAll,
  userPost,
  deletePost,
  postCount,
  Categoryfilter,
} = require("./posts.controllers");
const remove_likes = require("./remove_likes");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, create);
router.get("/:user_id", checkToken, userPost);
router.get("/", checkToken, findAll);
router.get("/filter/:post_category", checkToken, Categoryfilter);
router.get("/count/:user_id", checkToken, postCount);
router.delete("/:post_id/:user_id", checkToken, deletePost);

module.exports = router;

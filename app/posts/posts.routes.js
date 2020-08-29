const {
  create,
  findAll,
  userPost,
  deletePost,
  update,
  editPost,
  postCount,
  Categoryfilter,
  dislike,
} = require("./posts.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", create);
router.get("/:user_id", userPost);
router.get("/", findAll);
router.get("/:post_category", Categoryfilter);
router.put("/like/:post_id", update);
router.put("/dislike/:post_id", dislike);
router.put("/:post_id", editPost);
router.get("/count/:user_id", postCount);
router.delete("/:post_id", deletePost);

module.exports = router;

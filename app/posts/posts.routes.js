const {
  create,
  findAll,
  userPost,
  deletePost,
  editPost,
  postCount,
  Categoryfilter,
} = require("./posts.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", create);
router.get("/:user_id", userPost);
router.get("/", findAll);
router.get("/:post_category", Categoryfilter);
router.put("/:post_id", editPost);
router.get("/count/:user_id", postCount);
router.delete("/:post_id", deletePost);

module.exports = router;

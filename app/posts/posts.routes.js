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

router.post("/", checkToken, create);
router.get("/:user_id", checkToken, userPost);
router.get("/", checkToken, findAll);
router.get("/filter/:post_category", checkToken, Categoryfilter);
router.put("/:post_id", checkToken, editPost);
router.get("/count/:user_id", checkToken, postCount);
router.delete("/:post_id", checkToken, deletePost);

module.exports = router;

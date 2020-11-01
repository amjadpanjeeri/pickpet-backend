const {
  create,
  findOne,
  editUser,
  findAll,
  deleteAccount,
} = require("./profile.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, create);
router.get("/:user_id", checkToken, findOne);
router.get("/", checkToken, findAll);
router.put("/:user_id", checkToken, editUser);
router.delete("/:user_id", checkToken, deleteAccount);

module.exports = router;

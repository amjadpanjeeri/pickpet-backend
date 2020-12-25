const {
  create,
  getUser,
  premiumChecker,
} = require("./premiumusers.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/:user_id", create);
router.get("/:user_id", getUser);
router.get("/premiumChecker/:user_id", premiumChecker);

module.exports = router;

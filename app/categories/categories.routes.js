const { category } = require("./categories.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.get("/", category);
module.exports = router;

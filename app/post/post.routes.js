const { request } = require("express");

const { index, image1, image2, image3, image4 } = require("./post.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", index);
router.get("/image1/:post_id/:user_id", image1);
router.get("/image2/:post_id/:user_id", image2);
router.get("/image3/:post_id/:user_id", image3);
router.get("/image4/:post_id/:user_id", image4);

module.exports = router;

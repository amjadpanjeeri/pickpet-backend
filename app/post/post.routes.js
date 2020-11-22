const { request } = require("express");

const { index, image1, image2, image3, image4 } = require("./post.controllers");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/",checkToken, index);
router.get("/image1/:name", image1);
router.get("/image2/:name", image2);
router.get("/image3/:name", image3);
router.get("/image4/:name", image4);

module.exports = router;

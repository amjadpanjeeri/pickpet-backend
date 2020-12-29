const { request } = require("express");

const {
  index,
  image1,
  image2,
  image3,
  image4,
  viewAllfood,
  viewUserfood,
  deleteFood,makeFeatured
} = require("./petfood.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", index);
router.get("/all", viewAllfood);
router.get("/user/:user_id", viewUserfood);
router.delete("/delete/:product_id", deleteFood);
router.put("/featured/:product_id", makeFeatured);
router.get("/image1/:name", image1);
router.get("/image2/:name", image2);
router.get("/image3/:name", image3);
router.get("/image4/:name", image4);

module.exports = router;

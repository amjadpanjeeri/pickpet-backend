const {findOne,create} = require("./user.controller");
const router = require('express').Router();
router.post('/register',create);
router.post('/login',create);
module.exports = router;
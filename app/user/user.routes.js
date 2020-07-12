const {create,login} = require("./user.controller");
const router = require('express').Router();

router.post('/register',create);
router.post('/login',login);

module.exports = router;
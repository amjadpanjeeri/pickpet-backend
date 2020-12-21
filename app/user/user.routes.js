const { create, login, googleAuth } = require("./user.controller");
const router = require('express').Router();

router.post('/register', create);
router.post('/login', login);
router.post('/googleAuth', googleAuth);

module.exports = router;
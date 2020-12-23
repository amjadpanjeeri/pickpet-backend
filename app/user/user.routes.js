const { create, login, googleSignUp, googleSignIn } = require("./user.controller");
const router = require('express').Router();

router.post('/register', create);
router.post('/login', login);
router.post('/googleSignUp', googleSignUp);
router.post('/googleSignIn', googleSignIn);

module.exports = router;
const { create,findOne,editUser } = require('./profile.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/',checkToken,create);
router.get('/:user_id',findOne);
router.put('/:user_id',checkToken,editUser);

module.exports = router;
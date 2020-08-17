const { create,findOne,editUser ,findAll,deleteAccount} = require('./profile.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/',create);
router.get('/:user_id',findOne);
router.get('/',findAll);
router.put('/:user_id',editUser);
router.delete("/:user_id", deleteAccount);

module.exports = router;

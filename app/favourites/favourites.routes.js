const { create,findAll,Delete} = require('./favourites.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:post_id/:user_id',checkToken,create);
router.get('/:user_id',checkToken,findAll);
router.delete('/:post_id/:user_id',checkToken,Delete);

module.exports = router;

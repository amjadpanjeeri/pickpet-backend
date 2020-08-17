const { create,findAll,Delete} = require('./favourites.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:post_id',create);
router.get('/:user_id',findAll);
router.delete('/:post_id',Delete);

module.exports = router;

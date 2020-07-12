const { create,findAll,Delete} = require('./favourites.controller');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/',checkToken,create);
router.get('/',checkToken,findAll);
router.delete('/:post_id',checkToken,Delete);

module.exports = router;

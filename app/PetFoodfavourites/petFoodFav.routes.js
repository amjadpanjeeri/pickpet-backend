const { create,findAll,Delete,favouriteOrNot} = require('./petFoodFav.controllers');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation');

router.post('/:post_id/:user_id',create);
router.get('/:user_id',findAll);
router.delete('/:post_id/:user_id',Delete);
router.get('/check/:post_id/:user_id',favouriteOrNot);

module.exports = router;

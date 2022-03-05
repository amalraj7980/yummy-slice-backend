const express = require('express');
const router = express.Router();
const { addWishlist, getAllWishlists } = require('../controllers/wishlisting');

router.post('/addtoWishlist', addWishlist)
router.post('/getAllWishlists', getAllWishlists)
module.exports = router;
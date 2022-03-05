const express = require('express');
const router = express.Router();
const {
    addCarts,
    proceedToCheckout,
    getAllCartItems,
    userOrderDetails,
    allOrderdetails,
    orderUpdates
} = require('../controllers/addToCart')

router.post('/add/cart', addCarts)
router.post('/proceed/to/checkout', proceedToCheckout)
router.post('/get/all/carts', getAllCartItems)
router.post('/get/order/details', userOrderDetails)
router.get('/get/all/order/details', allOrderdetails)
router.put('/update/order/details', orderUpdates)
module.exports = router
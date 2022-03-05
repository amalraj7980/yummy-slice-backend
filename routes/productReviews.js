const express = require('express')
const router = express.Router()
const {
    addReview,
    getAllReviewsForAllProducts,
    getAllReviewsForSingleProduct,
    getUserReview
} = require('../controllers/productReviews')

router.post('/add/review', addReview)
router.post('/get/all/review/single/product', getAllReviewsForSingleProduct)
router.get('/get/all/review/all/product', getAllReviewsForAllProducts)
router.post('/get/user/review', getUserReview)

module.exports = router
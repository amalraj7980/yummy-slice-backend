const express = require('express');
const router = express.Router();
const {
    productAdding,
    productUpdate,
    getProducts,
    getSingleProduct,
    productDelete
} = require('../controllers/addProduct')

router.post('/addProduct', productAdding)
router.post('/updateProduct', productUpdate)
router.post('/allproducts', getProducts)
router.post('/getSingleProduct', getSingleProduct)
router.delete('/remove/product', productDelete)

module.exports = router
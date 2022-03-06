const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

//redis
// require('./redis/redis')

//routes
const Signin = require('./routes/signin')
const getAllUsers = require('./routes/signin')
const viewProfile = require('./routes/signin')
const Signup = require('./routes/signup')
const forgotPassword = require('./routes/forgotPassword')
const OTPVerify = require('./routes/forgotPassword')
const passwordChange = require('./routes/forgotPassword')
const updateProfile = require('./routes/profileUpdate')
const userDeviceRegister = require('./routes/resgisterUserDevice')
const addProduct = require('./routes/addProduct')
const allProducts = require('./routes/addProduct')
const addtoWishlist = require('./routes/wishlisting')
const getAllWishlists = require('./routes/wishlisting')
const singleProduct = require('./routes/addProduct')
const addToCart = require('./routes/addToCart')
const proceedToCheckout = require('./routes/addToCart')
const getAllCartItems = require('./routes/addToCart')
const userOrderDetails = require('./routes/addToCart')
const getAllOrderDetails = require('./routes/addToCart')
const updateProduct = require('./routes/addProduct')
const deleteProduct = require('./routes/addProduct')
const updateOrder = require('./routes/addToCart')
const notifications = require('./routes/notifications')
const addReviews = require('./routes/productReviews')
const singleProductReviews = require('./routes/productReviews')
const allProductReviews = require('./routes/productReviews')
const singleUserReviews = require('./routes/productReviews')

const app = express();

app.use(helmet())
app.use(cors())
app.use(morgan("combined"))

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const { sequelize } = require('./models');



app.use(Signup)
app.use(Signin)
app.use('/user', forgotPassword)
app.use('/user', OTPVerify)
app.use('/user', passwordChange)
app.use('/user', updateProfile)
app.use('/user', userDeviceRegister)
app.use('/user', allProducts)
app.use('/user', addtoWishlist)
app.use('/user', getAllWishlists)
app.use('/user', singleProduct)
app.use('/user', addToCart)
app.use('/user', proceedToCheckout)
app.use('/user', getAllCartItems)
app.use('/user', userOrderDetails)
app.use('/user', singleUserReviews)
app.use('/user', addReviews)
app.use('/user', singleProductReviews)
app.use('/user', allProductReviews)
app.use('/user', viewProfile)

//adding notfi-admin, get notifi-user 
app.use('/offer', notifications)

//admin 
app.use('/admin', addProduct)
app.use('/admin', updateProduct)
app.use('/admin', updateOrder)
app.use('/admin', getAllOrderDetails)
app.use('/admin', deleteProduct)
app.use('/admin', getAllUsers)

const PORT = process.env.PORT
app.listen(PORT, async () => {
    console.log(`server running port:${PORT}`)
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log("database connected")
})
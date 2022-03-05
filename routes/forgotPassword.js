const express = require('express')
const router = express.Router()
const { forgotPassword, OTPVerify, passwordChange } = require('../controllers/forgotPassword')

router.post('/forgotpassword', forgotPassword)
router.post('/otp/verification', OTPVerify)
router.put('/password/change', passwordChange)

module.exports = router
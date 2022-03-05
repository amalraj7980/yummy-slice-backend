const express = require('express')
const router = express.Router()
const { signin, getAllUsers, viewProfile } = require('../controllers/signin')

router.post('/signin', signin)
router.get('/get/all/users', getAllUsers)
router.post('/my/profile', viewProfile)
module.exports = router
const express = require('express')
const updatePro = express.Router()
const { updateProfile } = require('../controllers/profileUpdate')

updatePro.post('/updateProfile', updateProfile)

module.exports = updatePro
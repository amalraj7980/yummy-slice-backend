const express = require('express')
const Signup = express.Router();
const { signup } = require('../controllers/signup')

Signup.post('/signup', signup)
module.exports = Signup
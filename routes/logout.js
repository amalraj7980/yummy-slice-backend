const express = require('express')
const logoutRouter = express.Router()
const { logout } = require('../controllers/logout')

logoutRouter.delete('/logout',logout)

module.exports = logoutRouter
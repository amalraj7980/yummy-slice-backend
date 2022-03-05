const express = require('express');
const router = express.Router();
const { registerDevice } = require('../controllers/registerUserDevice')

router.post('/deviceRegistering', registerDevice)

module.exports = router;
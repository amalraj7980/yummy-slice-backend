const express = require('express');
const router = express.Router();
const { notifications,getNotifications } = require('../controllers/notifications')

router.post('/notification/adding', notifications)
router.get('/all/notifications', getNotifications)
module.exports = router
const { Notification } = require('../models')
const { validate } = require('../commonFunctions/reqValidation')

exports.notifications = async (req, res) => {
    const {
        title,
        content
    } = req.body
    try {
        const isValid = validate(req.body)
        if (isValid) {
            await Notification.create({
                title,
                content
            }).then(data => {
                res.json({
                    status: 'SUCCESS',
                    message: 'Notification added'
                })
            }).catch(err => {
                console.log("Error occured in notifications try catch block", err)
                res.json({
                    status: 'FAILED',
                    message: 'Couldnt complete'
                })
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'Check your credentials!!!'
            })
        }
    } catch (err) {
        console.log("Error occured in notifications", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.getNotifications = async (req, res) => {
    try {
        await Notification.findAll({
            attributes: { exclude: ['id'] }
        })
            .then(data => {
                res.json({
                    status: 'SUCCESS',
                    data
                })
            }).catch(err => {
                console.log("Error occured in await", err)
                res.json({
                    status: 'FAILED',
                    message: 'Couldnt get notifications'
                })
            })
    } catch (err) {
        console.log("Error ocuured in notifications getNotifications try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}
const { User } = require('../models')
const { sentMail } = require('../commonFunctions/nodeMailer');

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const validEmail = email.includes('@gmail.com')
    if (!validEmail || !email)
        return res.json({
            message: "Please enter valid email"
        })

    try {
        const user = await User.findOne({
            where: { email: email }
        })
        if (user) {
            const info = await sentMail(email, User)
            const statusFromInfo = info.status
            if (!statusFromInfo && info.error) {
                res.json({
                    status: 'FAILED',
                    message: 'Something wrong!!!'
                })
            } else {
                res.json({
                    status: 'SUCCESS',
                    message: 'Email send successfully'
                })
            }
        } else {
            res.json({
                status: 'FAILEd',
                message: 'Something wrong!!!'
            })
        }
    } catch (err) {
        return res.json({
            status: 'FAILED',
            err
        })
    }
}

exports.OTPVerify = async (req, res) => {
    const {
        OTP,
        uuid
    } = req.body;
    try {
        if (OTP !== '' || uuid !== '') {
            const user = await User.findOne({ where: { uuid, OTP } })
            if (user) {
                res.json({
                    status: 'SUCCESS',
                    message: 'OTP verified'
                })
            } else {
                res.send({
                    status: 'FAILED',
                    message: 'Invalid OTP'
                })
            }
        }
    } catch (err) {
        console.log("Error occured in password update try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

exports.passwordChange = async (req, res) => {
    const {
        uuid,
        password
    } = req.body
    try {
        const updated = await User.update({ password }, {
            where: { uuid }
        })
        if (updated) {
            res.send({
                status: 'SUCCESS',
                message: 'Your password changed'
            })
        } else {
            res.json({
                status: 'FAILED',
                message: 'You are not authenticated'
            })
        }
    } catch (err) {
        console.log("Error occured in password change try catch block", err)
        res.json({
            status: 'FAILED',
            message: 'Remote server unreachable'
        })
    }
}

const { User } = require('../models')
const { validate } = require('../commonFunctions/reqValidation')
exports.updateProfile = async (req, res) => {
    const {
        uuid,
        username,
        email,
        alternateMobileNumber,
        mobileNumber,
        address,
        landmark
    } = req.body;
    const isValid = validate(req.body)
    if (!isValid)
        return res.json({
            message: 'Enter your credentials!!!'
        })
    const validEmail = email.includes('@gmail.com')
    if (!validEmail)
        return res.json({
            message: 'Enter valid email'
        })
    try {
        await User.update({
            username,
            email,
            alternateMobileNumber,
            mobileNumber,
            address,
            landmark
        },
            {
                where: {
                    uuid
                }
            })
            .then((updated) => {
                if (!updated) {
                    res.json({
                        status: 'FAILED',
                        message: "Couldn't update!!!"
                    })
                } else {
                    res.json({
                        status: 'SUCCESS',
                        message: 'Successfully updated your profile'
                    })
                }
            })
            .catch(err => res.json({
                status: 'FAILED',
                err
            }))
    }
    catch (err) {
        res.json({
            status: 'FAILED',
            err
        })
    }

}
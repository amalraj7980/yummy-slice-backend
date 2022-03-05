const { User, DeviceDetails } = require('../models')
exports.signup = async (req, res) => {
    const {
        username,
        email,
        password,
        mobileNumber,
        address,
        landmark,
        userDeviceId,
        role
    } = req.body;
    if (!username || !email || !password )
        return res.json({
            message: 'Enter your credentials!!!'
        })
    const validEmail = email.includes('@gmail.com')
    const strongPassword = password.length >= 8;
    if (!validEmail || !strongPassword)
        return res.json({
            message: !validEmail ? 'Enter valid email' : 'Enter a strong password'
        })

    try {
        const resultDeviceId = await DeviceDetails.findOne({
            attributes: ['deviceId'],
            where: {
                login: false,
                deviceId: userDeviceId
            }
        })
        if (resultDeviceId.deviceId) {
            await DeviceDetails.update({ login: true }, {
                where: { deviceId: userDeviceId }
            })
        }
        const deviceId = resultDeviceId.deviceId;
        await User.create({
            username,
            email,
            password,
            mobileNumber,
            alternateMobileNumber: '6758787698',
            address,
            landmark,
            deviceId,
            role
        })
            .then(user => {
                console.log("user===>", user)
                if (user) return res.json({
                    status: 'SUCCESS',
                    data: {
                        uuid: user.uuid,
                        username: user.username,
                        role: user.role
                    }
                })
                return res.json({
                    status: "FAILED",
                    message: "Something Wrong"
                })
            })
            .catch(err => {
                console.log("<=========SignUp error======>", err)
                if (err.errors[0].message !== undefined) {
                    return res.json({
                        status: false,
                        message: 'User already exist.Please Signin!!!'
                    })
                }
            })

    } catch (err) {
        console.log("<=========SignUp try catch error======>", err)
        return res.json({
            status: false,
            err
        })
    }
}

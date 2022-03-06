const { DeviceDetails } = require('../models');

exports.registerDevice = async (req, res) => {
    const {
        deviceName,
        deviceId,
        login
    } = req.body
    try {
        const findDevice = await DeviceDetails.findOne({
            where:{deviceId},
        })
        if(findDevice){
            res.json({
                status:'SUCCESS',
                findDevice
            })
        }else{
            await DeviceDetails.create({
                deviceId,
                deviceName,
                login
            }).then(response => {
                if (response) {
                    res.json({
                        status: 'SUCCESS',
                        response
                    })
                } else {
                    res.json({
                        status: 'FAILED',
                        message: 'couldn"t complete'
                    })
                }
            }).catch(err => {
                console.log("Inside await method", err)
                res.json({
                    status: 'FAILED',
                    message: 'Something wrong!!!'
                })
            })
        }
    } catch (err) {
        console.log("Error in userDevice Registering", err);
        res.json({
            status: 'FAILED',
            message: 'Something wrong!!!'
        })
    }
}
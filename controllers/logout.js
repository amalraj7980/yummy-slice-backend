// const client = require("../redis/redis")
const jwt = require('jsonwebtoken');

exports.logout = async (req, res) => {
    const authHeader = req.headers['authorization']
    try {
        const token=authHeader && authHeader.split(' ')[1]
        if(!token)return res.json('no token provided')
            else 
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.json({
                    status: false,
                    message: 'Unauthorized...!!'
                })

            }
            const uuid = decoded.uuid
        //     client.GET(uuid, (err, result) => {
        //         if (err) {
        //             console.log(err)
        //             return res.json({
        //                 status: false,
        //                 message: 'Internal server error'
        //             })
        //         }
        //         if (token === result) {
        //             client.DEL(uuid)
        //             return res.json({
        //                 status: true,
        //                 message:'Logout completed'
        //             })
        //         }
        //     })
         })
}
    catch (err) {
        console.log(err)
    }
}
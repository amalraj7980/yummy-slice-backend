const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.verifyToken = async (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    try {
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.json('no token provided')
        else
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) return res.json({ token: false, message: 'token expired or user not logined' })
                else return (
                    next()
                )

            })
    }
    catch (err) {
        return res.json(err)
    }
}

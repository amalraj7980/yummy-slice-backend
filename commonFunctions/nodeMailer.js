const nodemailer = require('nodemailer');
let forOTP = 65;
const sentMail = async (email, User) => {

    const randomCodeGenerate = () => {
        let random1 = Math.floor((Math.random() * 100) + 10)
        let random2 = Math.floor((Math.random() * 50) + 10)
        let random3 = Math.floor((Math.random() * 20) + 10)
        let randomNumber
        return (
            randomNumber = `${random1} ${random3} ${random2}`)
    }
    const OTP = randomCodeGenerate()
    console.log(OTP)
    const OTPsave = await User.update({ OTP }, {
        where: { email }
    })
    return new Promise((resolve) => {
        if (OTPsave) {
            const transaport = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                auth: {
                    user: 'abhikrish1984@outlook.com',
                    pass: '1984krishabhi'
                }
            })
            const mailOptions = {
                from: 'abhikrish1984@outlook.com',
                to: 'abhikrishabhi461998@gmail.com',
                subject: "Yummy Slice slice send you verification code.",
                text: "Highly Confidential.Don't Share With Anyone",
                html: "<b>Your One Time Password Y-" + OTP + "</b>",

            }
            transaport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    resolve({ status: false, error })
                } else {
                    resolve({ status: true, info })
                }
            })
        } else {
            resolve({ error: true })
        }
    })

}
module.exports = { sentMail };

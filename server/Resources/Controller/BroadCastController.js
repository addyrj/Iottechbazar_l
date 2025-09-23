const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateOtp, otpMatcher } = require("../Helper/GenerateOtp");
const nodemailer = require("nodemailer");

const User = db.user;

const sendOtp = async (req, res) => {
    try {
        const { Email } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkUser = await User.findOne({ where: { email: Email } })
            if (checkUser) {
                const otp = await generateOtp();
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'anurag.kumar.88099@gmail.com',
                        pass: 'nxlzkdimnhflujyp',
                    },
                });

                let mailOptions = {
                    from: 'anurag.kumar.88099@gmail.com',
                    to: Email,
                    subject: `One Time Password (OTP)`,
                    html: ` <h2>IoTtech Bazzar</h2>
            <br />
            <p style ="color: black"; fontSize: 20px; fontWeight:bold;margin-top: 0px;"><h1 style="color : blue";>${otp}</h1> is your one time password to Iottech Bazaar</p>`
                };

                const sendEmailMethod = await transporter.sendMail(mailOptions);
                if (sendEmailMethod.messageId) {
                    User.update({ otp: otp, otp_status: "false" }, { where: { userId: checkUser.userId } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Otp Sent Successfully",
                                data: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Otp send Failed",
                                data: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Something went wrong"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! User is not exist"
                })
            }
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { Otp, Email } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);

        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkUser = await User.findOne({ where: { email: Email } });
            if (checkUser) {
                const isMatcher = await otpMatcher(Otp, checkUser.otp);
                if (isMatcher === true) {
                    const result = await User.update({ otp_status: "true", otp: null }, { where: { userId: checkUser.userId } });
                    if (result) {
                        res.status(200).send({
                            status: 200,
                            message: "Otp verification successfull"
                        })
                    } else {
                        res.status(300).send({
                            status: 300,
                            message: "Failed! Please enter correct otp or try again latter"
                        })
                    }
                } else {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Otp is not matched, please fill correct otp"
                    })
                }
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Failed! User is not exist"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { sendOtp, verifyOtp }
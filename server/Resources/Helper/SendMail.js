const nodemailer = require("nodemailer");
const { generateOtp } = require("./GenerateOtp");

const sendEmail = async (email) => {
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
        to: email,
        subject: `Chat Otp`,
        html: ` <h2>Chat Otp</h2>
        <br />
        <p style ="color: black"; fontSize: 20px; fontWeight:bold;margin-top: 0px;"><h1 style="color : blue";>${otp}</h1> is your one time password to chat app</p>`
    };

    const sendEmailMethod = await transporter.sendMail(mailOptions);
    if (sendEmailMethod.messageId) {
        return otp;
    } else {
        return null;
    }
}

module.exports = { sendEmail }
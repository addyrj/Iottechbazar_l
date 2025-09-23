const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const db = require("../../DB/config");
const { generateSlug, generateRememberToken, generateUserAuthToken } = require("../Helper/GenerateToken");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const { otpMatcher } = require("../Helper/GenerateOtp");
const Moment = require("moment");
const { where } = require("sequelize");
const info = require("../../DB/info");
const isEmpty = require("lodash.isempty");
const { default: axios } = require("axios");
const { checkUserCart } = require("../Helper/CheckUserInfo");

const USER = db.user;
const Cart = db.cart;
const Wishlist = db.wishlist;
// const Order = db.order;


const userRegister = async (req, res) => {
    try {
        const { Name, Email, Contact, Password, ConfirmPassword } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else if (Contact.length !== 10) {
            res.status(300).send({
                status: 300,
                message: "Failed! Contact number must be 10 digit"
            })
        } else if (Password !== ConfirmPassword) {
            res.status(300).send({
                status: 300,
                message: "Failed! Password and Confirm Password must be equal"
            })
        } else {
            let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            const userSlug = await generateSlug(Email);
            const hashPass = CryptoJS.AES.encrypt(Password, process.env.SECRET_KEY_USER_PASSWORD).toString();
            const info = {
                slug: userSlug,
                name: Name,
                email: Email,
                contact: Contact,
                avatar: req.file !== undefined ? req.file.filename : null,
                password: hashPass,
                socialId: null,
                socialType: "Email",
                ip: ip,
                lastLogin: null,
                rememberToken: null,
                status: "true",
                refferId: null,
                addedBy: null,
                updatedBy: null,
                deletedBy: null,
                deletedAt: null,
                otp: null,
                otp_status: "false"
            };

            USER.create(info)
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        message: "User create successfully",
                        data: result
                    });
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! User not registred",
                        data: error
                    });
                })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { Email, Password, rememberState } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkUser = await USER.findOne({ where: { email: Email } });
            if (checkUser) {
                let bytes = CryptoJS.AES.decrypt(checkUser.password, process.env.SECRET_KEY_USER_PASSWORD);
                let originalText = bytes.toString(CryptoJS.enc.Utf8);
                const isMatch = await otpMatcher(originalText, Password);
                if (isMatch === true) {
                    const rememberMe = await generateRememberToken(checkUser.userId, checkUser.email);
                    let date = new Date();
                    let currentDate = Moment(date).format('DD-MM-YYYY h:mm:ss a');
                    console.log("date is   ", currentDate)
                    let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
                    const token = generateUserAuthToken(checkUser.userId, checkUser.email);
                    const info = {
                        ip: ip,
                        lastLogin: currentDate,
                        rememberToken: rememberState === "true" ? rememberMe : ""
                    };

                    USER.update(info, { where: { userId: checkUser.userId } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "User Loged In Successfully",
                                id: checkUser.userId,
                                lastLogin: currentDate,
                                token: token
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! User in not loged in",
                                data: error
                            })
                        })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: 'Failed! User Credential is not valid'
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Failed! User || User Email is not exist'
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

const getProfile = async (req, res) => {
    try {
        const userInfo = req.user;
        if (userInfo) {
            const profileInfo = {
                userId: userInfo.userId,
                name: userInfo.name,
                email: userInfo.email,
                contact: userInfo.contact,
                avatar: userInfo.avatar,
                socialType: userInfo.socialType
            }
            const checkCart = await checkUserCart(userInfo);

            return res.status(200).json({
                status: 200,
                message: 'User profile data fetch suceessfully',
                info: { profileInfo, checkCart }
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: 'Failed! User is not exist'
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const editProfile = async (req, res) => {
    try {
        const { Name, Email, Contact, Slug } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else if (Contact.length !== 10) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Contact number must be 10 digit"
            })
        } else {
            const checkUser = await USER.findOne({ where: { slug: Slug } });
            if (checkUser) {
                if (checkUser.otp_status === "true") {
                    const info = {
                        email: Email,
                        name: Name,
                        contact: Contact,
                        avatar: req.file !== undefined ? req.file.filename : null
                    }

                    USER.update(info, { where: { slug: Slug } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "User profile update successfully",
                                data: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! User profile not updated",
                                data: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! You have not authorized to do this operation"
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

const changePassword = async (req, res) => {
    try {
        const { Email, Password, ConfirmPassword } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else if (Password !== ConfirmPassword) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Password and confirm password is not equal"
            })
        } else {
            const checkUser = await USER.findOne({ where: { email: Email } });
            if (checkUser) {
                if (checkUser.otp_status === "true") {
                    const hashPass = CryptoJS.AES.encrypt(Password, process.env.SECRET_KEY_USER_PASSWORD).toString();

                    USER.update({ password: hashPass }, { where: { email: Email } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Password change successfully",
                                data: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Something went wrong",
                                data: error
                            })
                        })


                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! You have not authorized to do this operation"
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

const socialLogin = async (req, res) => {
    try {
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then(response => {
                const user = response.data;
                return res.status(200).json({
                    status: 200,
                    message: 'Data Fetched',
                    info: user
                })
            })
            .catch(error => {
                return res.status(300).json({
                    status: 300,
                    message: 'Failed',
                    info: error.message || error
                })
            });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const sendLoginOtp = async (req, res, next) => {
    try {
        const { Contact } = req.body;
        const Otp = "123456";
        if (isEmpty(Contact)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Contact number is not exist"
            })
        } else if (Contact.length !== 10) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Contact number is not valid"
            })
        } else {
            // https://2factor.in/API/V1/a94f102f-82db-11ea-9fa5-0200cd936042/SMS/' . $contact . '/' . $otp . '/RANKTOP

            // const sendOtpUrl = `${process.env.TWO_FACTOR_API_URL}/${process.env.TWO_FACTOR_API_KEY}/SMS/${Contact}/${Otp}/${process.env.TWO_FACTOR_API_BASE_KEY}`;
            const sendOtpUrl = "https://2factor.in/API/V1/a94f102f-82db-11ea-9fa5-0200cd936042/SMS/7070532135/123456/RANKTOP"

            await axios.get(sendOtpUrl)
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Otp Sent successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Otp Sent Failed",
                        info: error
                    })
                })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const verifyLoginOtp = async (req, res, next) => {
    try {
        const { Contact, Otp } = req.body;
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const getCustomer = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const getCusomer = await USER.findAll({ attributes: { exclude: ['password'] } });

            if (getCusomer.length !== 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Customer Detail fetch successfull",
                    info: getCusomer
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Customer not found"
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
module.exports = { userRegister, userLogin, getProfile, editProfile, changePassword, socialLogin, sendLoginOtp, verifyLoginOtp, getCustomer }
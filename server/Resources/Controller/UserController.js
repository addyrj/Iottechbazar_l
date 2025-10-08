 ErrorNullResponse = require("../Helper/ErrorNullResponse");
const db = require("../../DB/config");
const { generateSlug, generateRememberToken, generateUserAuthToken } = require("../Helper/GenerateToken");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const { otpMatcher } = require("../Helper/GenerateOtp");
const Moment = require("moment");
const { where, Op } = require("sequelize");
const info = require("../../DB/info");
const isEmpty = require("lodash.isempty");
const { default: axios } = require("axios");
const { checkUserCart } = require("../Helper/CheckUserInfo");

const USER = db.user;
const Cart = db.cart;
const Wishlist = db.wishlist;

const userRegister = async (req, res) => {
    try {
        const { Name, Email, Contact, Password, ConfirmPassword } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        
        if (errorMessage.length !== 0) {
            return res.status(400).json({
                status: 400,
                message: errorMessage
            })
        } else if (Contact.length !== 10) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact number must be 10 digit"
            })
        } else if (Password !== ConfirmPassword) {
            return res.status(400).json({
                status: 400,
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
                otp_expires: null,
                otp_status: "true" // Set to true for auto-verified users
            };

            USER.create(info)
                .then(async (result) => {
                    // Auto-login after registration
                    const userId = result.userId;
                    const userEmail = result.email;
                    
                    // Generate login token
                    const token = generateUserAuthToken(userId, userEmail);
                    let date = new Date();
                    let currentDate = Moment(date).format('DD-MM-YYYY h:mm:ss a');
                    
                    // Update last login info
                    await USER.update({
                        ip: ip,
                        lastLogin: currentDate,
                        otp_status: "true" // Mark as verified
                    }, { 
                        where: { userId: userId } 
                    });

                    return res.status(200).json({
                        status: 200,
                        message: "User created and logged in successfully",
                        data: result,
                        token: token,
                        id: userId,
                        lastLogin: currentDate
                    });
                })
                .catch((error) => {
                    console.error("User registration error:", error);
                    
                    // Check if it's a duplicate email/contact error
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return res.status(400).json({
                            status: 400,
                            message: "Failed! Email or contact number already exists"
                        });
                    }
                    
                    return res.status(500).json({
                        status: 500,
                        message: "Failed! User not registered due to server error",
                        data: error.message
                    });
                })
        }
    } catch (error) {
        console.error("Registration catch error:", error);
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
            return res.status(400).json({
                status: 400,
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
                            return res.status(500).json({
                                status: 500,
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



// Send OTP for Mobile Login - FIXED VERSION
const sendLoginOtp = async (req, res) => {
    try {
        const { Contact } = req.body;

        console.log("Received OTP request for contact:", Contact);

        if (isEmpty(Contact)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact number is required"
            })
        } else if (Contact.length !== 10) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact number must be 10 digits"
            })
        } else {
            // Check if user exists with this contact
            const user = await USER.findOne({ where: { contact: Contact } });
            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! No user found with this contact number"
                })
            }

            // Generate 6 digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

            console.log(`Generated OTP ${otp} for contact ${Contact}, expires at: ${expiresAt}`);

            // Store OTP in user table temporarily
            const updateResult = await USER.update({
                otp: otp,
                otp_expires: expiresAt,
                otp_status: "false"
            }, { 
                where: { contact: Contact } 
            });

            console.log("OTP stored in database, update result:", updateResult);

            // For development - ALWAYS return OTP in response
            console.log("OTP for", Contact, ":", otp);
            
            // Check if SMS API is configured
            if (process.env.TWO_FACTOR_API_URL && process.env.TWO_FACTOR_API_KEY) {
                try {
                    const sendOtpUrl = `${process.env.TWO_FACTOR_API_URL}/${process.env.TWO_FACTOR_API_KEY}/SMS/${Contact}/${otp}/${process.env.TWO_FACTOR_API_BASE_KEY || 'OTP'}`;
                    
                    console.log("Attempting to send SMS via URL:", sendOtpUrl);
                    
                    const smsResponse = await axios.get(sendOtpUrl, { timeout: 10000 });
                    console.log("SMS API Response:", smsResponse.data);
                    
                    if (smsResponse.data && smsResponse.data.Status === "Success") {
                        return res.status(200).json({
                            status: 200,
                            message: "OTP sent successfully to your mobile",
                            info: { 
                                contact: Contact,
                                // Include OTP in development for testing
                                otp: process.env.NODE_ENV === 'development' ? otp : undefined
                            }
                        });
                    }
                } catch (smsError) {
                    console.log("SMS sending failed:", smsError.message);
                    // Continue to return OTP for development
                }
            }

            // ALWAYS return OTP for development/testing (remove in production)
            return res.status(200).json({
                status: 200,
                message: "OTP generated successfully",
                info: { 
                    contact: Contact, 
                    otp: otp, // Include OTP for development
                    note: process.env.NODE_ENV === 'production' ? undefined : "Development mode - OTP shown",
                    expiresIn: "10 minutes"
                }
            });
        }
    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Internal server error: " + (error.message || error)
        })
    }
}

// Verify OTP for Mobile Login
const verifyLoginOtp = async (req, res) => {
    try {
        const { Contact, Otp } = req.body;

        console.log("Received OTP verification request:", { Contact, Otp });

        if (isEmpty(Contact) || isEmpty(Otp)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact and OTP are required"
            })
        }

        if (Otp.length !== 6) {
            return res.status(400).json({
                status: 400,
                message: "Failed! OTP must be 6 digits"
            })
        }

        // Find user with valid OTP
        const user = await USER.findOne({ 
            where: { 
                contact: Contact 
            }
        });

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Failed! No user found with this contact number"
            })
        }

        console.log("User found:", user.userId);
        console.log("Stored OTP:", user.otp);
        console.log("OTP expires:", user.otp_expires);
        console.log("Current time:", new Date());

        // Check if OTP matches and is not expired
        if (!user.otp || user.otp !== Otp) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Invalid OTP"
            })
        }

        if (!user.otp_expires || new Date() > new Date(user.otp_expires)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! OTP has expired"
            })
        }

        // Mark OTP as used
        await USER.update({ 
            otp: null,
            otp_expires: null,
            otp_status: "true"
        }, { 
            where: { contact: Contact } 
        });

        console.log("OTP verified successfully for user:", user.userId);

        // Generate login token
        const token = generateUserAuthToken(user.userId, user.email);
        let date = new Date();
        let currentDate = Moment(date).format('DD-MM-YYYY h:mm:ss a');
        let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

        console.log("Generated token for user:", user.userId);

        // Update last login
        await USER.update({
            ip: ip,
            lastLogin: currentDate
        }, { 
            where: { userId: user.userId } 
        });

        console.log("Last login updated for user:", user.userId);

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            id: user.userId,
            lastLogin: currentDate,
            token: token
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Internal server error: " + (error.message || error)
        })
    }
}


// Send OTP for Forgot Password
const sendForgotPasswordOtp = async (req, res) => {
    try {
        const { Contact } = req.body;

        console.log("Received forgot password OTP request for contact:", Contact);

        if (isEmpty(Contact)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact number is required"
            })
        } else if (Contact.length !== 10) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Contact number must be 10 digits"
            })
        } else {
            // Check if user exists with this contact
            const user = await USER.findOne({ where: { contact: Contact } });
            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! No user found with this contact number"
                })
            }

            // Generate 6 digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

            console.log(`Generated forgot password OTP ${otp} for contact ${Contact}`);

            // Store OTP in user table
            await USER.update({
                otp: otp,
                otp_expires: expiresAt,
                otp_status: "false"
            }, { 
                where: { contact: Contact } 
            });

            // Send OTP via SMS using 2Factor API
            const sendOtpUrl = `${process.env.TWO_FACTOR_API_URL}/${process.env.TWO_FACTOR_API_KEY}/SMS/${Contact}/${otp}/Your_OTP_for_password_reset_is`;
            
            try {
                const smsResponse = await axios.get(sendOtpUrl);
                console.log("SMS API Response:", smsResponse.data);
                
                // Check if SMS was sent successfully
                if (smsResponse.data.Status === "Success") {
                    return res.status(200).json({
                        status: 200,
                        message: "OTP sent successfully to your mobile for password reset",
                        info: { 
                            contact: Contact,
                            expiresIn: "10 minutes"
                        }
                    });
                } else {
                    // If SMS fails, still return OTP for development
                    console.log("SMS sending failed with response:", smsResponse.data);
                    return res.status(200).json({
                        status: 200,
                        message: "OTP generated successfully for password reset",
                        info: { 
                            contact: Contact, 
                            otp: otp, // For development only
                            expiresIn: "10 minutes"
                        }
                    });
                }
            } catch (smsError) {
                console.log("SMS sending failed:", smsError.message);
                // Even if SMS fails, return success with OTP for development
                return res.status(200).json({
                    status: 200,
                    message: "OTP generated successfully for password reset",
                    info: { 
                        contact: Contact, 
                        otp: otp, // For development only
                        expiresIn: "10 minutes"
                    }
                });
            }
        }
    } catch (error) {
        console.error("Send Forgot Password OTP Error:", error);
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Internal server error: " + (error.message || error)
        })
    }
}

// Verify OTP and Reset Password
const resetPasswordWithOtp = async (req, res) => {
    try {
        const { Contact, Otp, NewPassword, ConfirmPassword } = req.body;

        console.log("Received password reset request:", { Contact, Otp });

        if (isEmpty(Contact) || isEmpty(Otp) || isEmpty(NewPassword) || isEmpty(ConfirmPassword)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! All fields are required"
            })
        }

        if (NewPassword !== ConfirmPassword) {
            return res.status(400).json({
                status: 400,
                message: "Failed! New password and confirm password must match"
            })
        }

        if (Otp.length !== 6) {
            return res.status(400).json({
                status: 400,
                message: "Failed! OTP must be 6 digits"
            })
        }

        // Find user with valid OTP
        const user = await USER.findOne({ 
            where: { 
                contact: Contact 
            }
        });

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Failed! No user found with this contact number"
            })
        }

        // Check if OTP matches and is not expired
        if (!user.otp || user.otp !== Otp) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Invalid OTP"
            })
        }

        if (!user.otp_expires || new Date() > new Date(user.otp_expires)) {
            return res.status(400).json({
                status: 400,
                message: "Failed! OTP has expired"
            })
        }

        // Mark OTP as used and update password
        const hashPass = CryptoJS.AES.encrypt(NewPassword, process.env.SECRET_KEY_USER_PASSWORD).toString();

        await USER.update({ 
            password: hashPass,
            otp: null,
            otp_expires: null,
            otp_status: "true"
        }, { 
            where: { contact: Contact } 
        });

        console.log("Password reset successfully for user:", user.userId);

        return res.status(200).json({
            status: 200,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Internal server error: " + (error.message || error)
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
            return res.status(400).json({
                status: 400,
                message: errorMessage
            })
        } else if (Contact.length !== 10) {
            return res.status(400).json({
                status: 400,
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
                            return res.status(500).json({
                                status: 500,
                                message: "Failed! User profile not updated",
                                data: error
                            })
                        })
                } else {
                    return res.status(400).json({
                        status: 400,
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
            return res.status(400).json({
                status: 400,
                message: errorMessage
            })
        } else if (Password !== ConfirmPassword) {
            return res.status(400).json({
                status: 400,
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
                            return res.status(500).json({
                                status: 500,
                                message: "Failed! Something went wrong",
                                data: error
                            })
                        })


                } else {
                    return res.status(400).json({
                        status: 400,
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
                return res.status(500).json({
                    status: 500,
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

const getCustomer = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(401).send({
                status: 401,
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
                return res.status(404).json({
                    status: 404,
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

module.exports = {
 userRegister,
    userLogin,
    getProfile,
    editProfile,
    changePassword,
    socialLogin,
    sendLoginOtp,
    verifyLoginOtp,
    sendForgotPasswordOtp, // Make sure this is exported
    resetPasswordWithOtp,  // Make sure this is exported
    getCustomer
}
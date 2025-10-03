const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const CryptoJS = require("crypto-js");
const { generateSlug, generateAdminSlug, generateUserAuthToken, generateAdminAuthToken } = require("../Helper/GenerateToken");
const { otpMatcher } = require("../Helper/GenerateOtp");
const Moment = require("moment")

const Admin = db.admin;

const createAdmin = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { Name, Email, Contact, Role, Address, Password, ConfirmPassword } = req.body;
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
            const hashPass = CryptoJS.AES.encrypt(Password, process.env.SECRET_KEY_ADMIN_PASSWORD).toString();
            const slug = await generateAdminSlug(Email)

            const info = {
                slug: slug,
                name: Name,
                email: Email,
                contact: Contact,
                role: Role,
                address: Address,
                avatar: req.file !== undefined ? req.file.filename : null,
                password: hashPass,
                ip: ip,
                lastLogin: null,
                status: true,
                addedBy: admin.role,
                updatedBy: null,
                deletedBy: null,
                deletedAt: null,
                otp: null,
                otp_status: false
            }

            await Admin.create(info)
                .then((result) => {
                    Admin.update({ slug: result.id }, { where: { id: result.id } })
                        .then((updateResult) => {
                            res.status(200).send({
                                status: 200,
                                message: "Admin create successfully",
                                data: updateResult
                            });
                        })
                        .catch((error) => {
                            res.status(300).send({
                                status: 300,
                                message: "Failed! Admin not registred",
                                data: error
                            });
                        })
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Admin not registred",
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
    next();
}

const adminLogin = async (req, res, next) => {
    try {
        const { Email, Password } = req.body
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkAdmin = await Admin.findOne({ where: { email: Email } });
            if (checkAdmin) {
                let bytes = CryptoJS.AES.decrypt(checkAdmin.password, process.env.SECRET_KEY_ADMIN_PASSWORD);
                let originalPassowrd = bytes.toString(CryptoJS.enc.Utf8);
                const isMatch = await otpMatcher(originalPassowrd, Password);
                const token = generateAdminAuthToken(checkAdmin.id, checkAdmin.email);

                if (isMatch === true) {
                    let date = new Date();
                    let currentDate = Moment(date).format('DD-MM-YYYY h:mm:ss a');
                    let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

                    await Admin.update({ ip: ip, lastLogin: currentDate }, { where: { slug: checkAdmin.slug, id: checkAdmin.id } })
                        .then((result) => {
                            res.status(200).send({
                                status: 200,
                                message: "Admin Logged In Successfully",
                                id: checkAdmin.id,
                                token: token,
                                slug: checkAdmin.slug
                            });
                        })
                        .catch((error) => {
                            res.status(300).send({
                                status: 300,
                                message: "Failed! Admin credential not valid",
                                data: error
                            });
                        })
                } else {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Admin credential not valid"
                    });
                }
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Failed! Admin not found"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const adminGetProfile = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (admin) {
            const adminInfo = {
                slug: admin.slug,
                name: admin.name,
                email: admin.email,
                contact: admin.contact,
                role: admin.role,
                address: admin.address
            }
            res.status(200).send({
                status: 200,
                message: "Admin profile data fetch successfully",
                info: adminInfo
            })
        } else {
            res.status(400).send({
                status: 400,
                message: "Failed! Admin not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const adminChangePassword = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const adminPasswordGenerator = async (req, res, next) => {
    try {
        const email = req.body.email;
        const id = req.body.id;
        const password = req.body.password;
        const cnfPass = req.body.cnfPass;
        if (isEmpty(id)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Id is not found"
            })
        } else if (isEmpty(email)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Email is not found"
            })
        } else if (isEmpty(password)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Password is not found"
            })
        } else if (isEmpty(cnfPass)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Confirm Password is not found"
            })
        } else if (password !== cnfPass) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Password and Confirm Password is not matched"
            })
        } else {
            const hashPass = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_ADMIN_PASSWORD).toString();
            const adminSlug = await generateAdminSlug(email);
            await Admin.update({ password: hashPass, slug: adminSlug }, { where: { id: id } })
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Admin password generate successfully",
                        data: result
                    });
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Admin password is not generate",
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
    next();
}

const checkShowPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        if (isEmpty(email)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Email is not found"
            })
        } else {
            const checkAdmin = await Admin.findOne({ where: { email: email } });
            if (checkAdmin) {
                let bytes = CryptoJS.AES.decrypt(checkAdmin.password, process.env.SECRET_KEY_ADMIN_PASSWORD);
                let originalPassowrd = bytes.toString(CryptoJS.enc.Utf8);
                res.status(200).send({
                    status: 200,
                    message: "Password decrypt successfull",
                    info: originalPassowrd
                })
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! Invalid creadential"
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
    next();
}


module.exports = { createAdmin, adminLogin, adminGetProfile, adminChangePassword, adminPasswordGenerator, checkShowPassword }
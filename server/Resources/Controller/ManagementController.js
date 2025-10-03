const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const jwt = require("jsonwebtoken");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateAdminSlug } = require("../Helper/GenerateToken");
const CryptoJS = require("crypto-js");

const Admin = db.admin;
const RoleTable = db.role;

const addManager = async (req, res, next) => {
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
            return res.status(300).json({
                status: 300,
                message: "Failed! Contact number must be 10 digit"
            })
        } else if (Password !== ConfirmPassword) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Password and confirm password not match"
            })
        } else {
            let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
            const adminSlug = await generateAdminSlug(Email);
            const hashPass = CryptoJS.AES.encrypt(Password, process.env.SECRET_KEY_ADMIN_PASSWORD).toString();
            const checkRole = await RoleTable.findOne({ where: { slug: Role } });
            if (checkRole) {
                const info = {
                    slug: adminSlug,
                    name: Name,
                    email: Email,
                    contact: Contact,
                    role: checkRole.name,
                    roleSlug: Role,
                    address: Address,
                    avatar: req.file !== undefined ? req.file.filename : null,
                    ip: ip,
                    password: hashPass,
                    addedBy: admin.role,
                    status: "true",
                    otp: null,
                    otp_status: "false"
                }

                await Admin.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Manager create successfully",
                            data: result
                        });
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Manager not registred",
                            info: error
                        });
                    })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Role not exist",
                    info: error
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

const getManager = async (req, res, next) => {
    try {
        const checkManager = await Admin.findAll();
        if (checkManager.length !== 0) {
            const filterManager = checkManager.map((item) => {
                const id = item.id;
                const slug = item.slug;
                const name = item.name;
                const email = item.email;
                const contact = item.contact;
                const role = item.role;
                const address = item.address;
                const status = item.status;
                const addedBy = item.addedBy;
                const avatar = item.avatar;

                return {
                    id, slug, name, email, contact, role, address, status, addedBy, avatar
                }
            });

            return res.status(200).json({
                status: 200,
                message: "Manager data fetch successfully",
                info: filterManager
            });
        } else {
            return res.status(300).json({
                status: 300,
                message: "Failed! Manager not found"
            });
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


module.exports = { addManager, getManager }
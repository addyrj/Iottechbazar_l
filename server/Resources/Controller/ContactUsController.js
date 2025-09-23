const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const ContactUs = db.contactUs;

const createEnquiry = async (req, res, next) => {
    try {
        const { name, email, contact, subject, message, userType } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const slug = await generateProductSlug(subject);
            const info = {
                slug: slug,
                name: name,
                email: email,
                contact: contact,
                subject: subject,
                message: message,
                userType: userType
            }

            await ContactUs.create(info)
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        message: "Contact us create successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Contact us not created",
                        info: result
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

const getAllEnquiry = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkQuery = await ContactUs.findAll();

            if (checkQuery.length !== 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Contact us query fetch sucessfully",
                    info: checkQuery
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Contact us query not found"
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

const getUserEnquiry = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const deleteCoupon = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { createEnquiry, getAllEnquiry }
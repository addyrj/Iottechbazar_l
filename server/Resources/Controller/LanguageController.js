const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Language = db.language;

const createLanguage = async (req, res, next) => {
    try {
        const { name, countryCode, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const slug = await generateProductSlug(name);
                const info = {
                    name: name,
                    slug: slug,
                    countryCode: countryCode,
                    createdBy: admin.role,
                    status: "true"
                }

                await Language.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Language Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Language not Created",
                            info: error
                        })
                    })
            } else {
                return res.status(300).send({
                    status: 300,
                    message: "Failed! You are not authorized person"
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

const getLanguage = async (req, res, next) => {
    try {
        const langugaeList = await Language.findAll();
        if (langugaeList.length !== 0) {
            return res.status(200).json({
                status: 200,
                message: "Language data fetch successfully",
                info: langugaeList
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! No Language Found",
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

const updateLanguage = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const deleteLanguage = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const changeLanguageStatus = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { createLanguage, getLanguage, updateLanguage, deleteLanguage, changeLanguageStatus }
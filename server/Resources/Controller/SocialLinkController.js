const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const SocialLink = db.socialLink;

const createSocialLink = async (req, res, next) => {
    try {
        const { name, url, icon, pageUrl } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not autorized"
            })
        } else if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkRoute = await checkRoutePermission(admin, pageUrl);
            if (checkRoute === true) {
                const slug = await generateProductSlug(name);
                const info = {
                    slug: slug,
                    name: name,
                    url: url,
                    status: "true",
                    createdBy: admin.role,
                    icon: icon
                }

                await SocialLink.create(info)
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            message: "Social link is created successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).json({
                            status: 300,
                            message: "Failed! Social link is not created",
                            info: error
                        })
                    })
            } else {
                res.status(300).json({
                    status: 300,
                    message: "Failed! Authorization Failed",
                    info: result
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

const getSocialLink = async (req, res, next) => {
    try {
        const checkSocialLink = await SocialLink.findAll();
        if (checkSocialLink.length !== 0) {
            return res.status(200).json({
                status: 200,
                message: "Social link data fetch successfully",
                info: checkSocialLink
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Social link is not found"
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

const updateSocialLink = async (req, res, next) => {
    try {
        const { id, url, icon, name } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const admin = req.admin;
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkSocialLink = await SocialLink.findOne({ where: { id: id } })
            if (checkSocialLink) {
                if (checkSocialLink.createdBy === admin.role || checkSocialLink.createdBy === "Admin") {
                    const info = {
                        name: name,
                        url: url,
                        icon: icon
                    }

                    await SocialLink.update(info, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Social Link Update Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).send({
                                status: 300,
                                message: "Failed! Social Link not updated",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Authorization Failed"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Scial link is not found"
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

const deleteSocialLink = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const changeSocialLinkStatus = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { createSocialLink, getSocialLink, updateSocialLink, deleteSocialLink, changeSocialLinkStatus }
const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Color = db.color;

const createColor = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { name,value, url } = req.body;

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
                const slug = await generateProductSlug(name)
                const info = {
                    name: name,
                    value : value,
                    slug: slug,
                    createdBy: admin.role,
                    status: "true"
                }

                await Color.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Color Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Color not Created",
                            info: error
                        })
                    })
            } else {
                return res.status(300).send({
                    status: 300,
                    message: "Authorization Failed!"
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

const getColor = async (req, res, next) => {
    try {
        const checkColor = await Color.findAll();
        if (checkColor.length !== 0) {
            const filterColor = checkColor.map((item) => {
                const id = item.id;
                const slug = item.slug;
                const name = item.name;
                const mulLanguageName = JSON.parse(item.mulLanguageName);
                const status = item.status;
                const value = item.value;
                const createdBy = item.createdBy;
                const createdAt = item.createdAt;

                return {
                    id, slug, name, mulLanguageName, status, value, createdBy, createdAt
                }
            })

            res.status(200).send({
                status: 200,
                message: "Color Data fetch successfully",
                info: filterColor
            })
        } else {
            return res.status(400).send({
                status: 400,
                message: "Failed! Color is not found"
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

const updateColor = async (req, res, next) => {
    try {
        const { name, slug, value } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkColor = await Color.findOne({ where: { slug: slug } });
            if (checkColor.createdBy === admin.role || checkColor.createdBy === "Admin") {
                const info = {
                    name: name,
                    value: value
                }
                await Color.update(info, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Color Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Color not updated",
                            info: error
                        })
                    })
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "You have not authorized to update this category"
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

const deleteColor = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Slug is not found"
            })
        } else {
            const checkColor = await Color.findOne({ where: { slug: slug } });
            if (checkColor.createdBy === admin.role || checkColor.createdBy === "Admin") {
                await Color.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Color delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Color not deleted",
                            info: error
                        })
                    })
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "You have not authorized to update this category"
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

const changeColorStatus = async (req, res, next) => {
    try {
        const { status, slug } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkColor = await Color.findOne({ where: { slug: slug } });
            if (checkColor.createdBy === admin.role || checkColor.createdBy === "Admin") {
                await Color.update({ status: status }, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Color status Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Color status not updated",
                            info: error
                        })
                    })
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "You have not authorized to update this category"
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

const createColorLanguage = async (req, res, next) => {
    try {
        const { slug, mulLanguageName } = req.body;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Color Slug is not found"
            })
        } else if (isEmpty(mulLanguageName)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! add at least one text"
            })
        } else {
            const checkColor = await Color.findOne({ where: { slug: slug } });
            if (checkColor) {
                if (checkColor.createdBy === admin.role || checkColor.createdBy === "Admin") {
                    if (isEmpty(checkColor.mulLanguageName) || checkColor.mulLanguageName === null) {
                        await Color.update({ mulLanguageName: mulLanguageName }, { where: { slug: slug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Color multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Color multiple language text not updated",
                                    info: error
                                })
                            })
                    } else {
                        const newArray = JSON.parse(JSON.parse(checkColor.mulLanguageName)).concat(JSON.parse(mulLanguageName));

                        await Color.update({ mulLanguageName: JSON.stringify(newArray) }, { where: { slug: slug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Color multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Color multiple language text not updated",
                                    info: error
                                })
                            })
                    }
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "You have not authorized to update this category"
                    })
                }
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Failed! Color is not found"
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

module.exports = { createColor, getColor, updateColor, deleteColor, changeColorStatus, createColorLanguage }
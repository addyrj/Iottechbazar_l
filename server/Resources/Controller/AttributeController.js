const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { checkRoutePermission } = require("../Function/RouteAuth");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Attribute = db.attribute;

const addAttribute = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { name, url } = req.body;

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
                    slug: slug,
                    createdBy: admin.role,
                    status: "true"
                }

                await Attribute.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Attribute Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Attribute not Created",
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

const getAttribute = async (req, res, next) => {
    try {
        const checkAttribute = await Attribute.findAll();
        if (checkAttribute.length !== 0) {
            const filterAttribute = checkAttribute.map((item) => {
                const id = item.id;
                const slug = item.slug;
                const name = item.name;
                const mulLanguageName = JSON.parse(item.mulLanguageName);
                const status = item.status;
                const createdBy = item.createdBy;
                const createdAt = item.createdAt;

                return {
                    id, slug, name, mulLanguageName, status, createdBy, createdAt
                }
            })

            res.status(200).send({
                status: 200,
                message: "Attribute Data fetch successfully",
                info: filterAttribute
            })
        } else {
            return res.status(400).send({
                status: 400,
                message: "Failed! Attribute is not found"
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

const updateAttribute = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkAttribute = await Attribute.findOne({ where: { slug: slug } });
            if (checkAttribute.createdBy === admin.role || checkAttribute.createdBy === "Admin") {
                const info = {
                    name: name
                }
                await Attribute.update(info, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute not updated",
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

const deleteAttribute = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Slug is not found"
            })
        } else {
            const checkAttribute = await Attribute.findOne({ where: { slug: slug } });
            if (checkAttribute.createdBy === admin.role || checkAttribute.createdBy === "Admin") {
                await Attribute.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute not deleted",
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

const changeAttributeStatus = async (req, res, next) => {
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
            const checkAttribute = await Attribute.findOne({ where: { slug: slug } });
            if (checkAttribute.createdBy === admin.role || checkAttribute.createdBy === "Admin") {
                await Attribute.update({ status: status }, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute status Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute status not updated",
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

const addAttributeLanguage = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { attributeSlug, mulLanguageName } = req.body;
        if (isEmpty(attributeSlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Attribute Slug is not found"
            })
        } else if (isEmpty(mulLanguageName)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! add at least one text"
            })
        } else {
            const checkAttribute = await Attribute.findOne({ where: { slug: attributeSlug } });
            if (checkAttribute) {
                if (checkAttribute.createdBy === admin.role || checkAttribute.createdBy === "Admin") {
                    if (isEmpty(checkAttribute.mulLanguageName) || checkAttribute.mulLanguageName === null) {
                        await Attribute.update({ mulLanguageName: mulLanguageName }, { where: { slug: attributeSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Attribute multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Attribute multiple language text not updated",
                                    info: error
                                })
                            })
                    } else {
                        const newArray = JSON.parse(JSON.parse(checkAttribute.mulLanguageName)).concat(JSON.parse(mulLanguageName));

                        await Attribute.update({ mulLanguageName: JSON.stringify(newArray) }, { where: { slug: attributeSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Attribute multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Attribute multiple language text not updated",
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
                    message: "Failed! Attribute is not found"
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

module.exports = { addAttribute, getAttribute, updateAttribute, deleteAttribute, changeAttributeStatus, addAttributeLanguage }
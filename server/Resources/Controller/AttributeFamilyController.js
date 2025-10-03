const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const { checkRoutePermission } = require("../Function/RouteAuth");
const { generateProductSlug } = require("../Helper/GenerateToken");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");

const Attribute = db.attribute;
const AttributeFamily = db.attributeFamily;

const addAttributeFamily = async (req, res, next) => {
    try {
        const { attributeSlug, name, url } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);

        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const checkAttribute = await Attribute.findOne({ where: { slug: attributeSlug } });
                if (checkAttribute) {
                    const slug = await generateProductSlug(name)

                    const info = {
                        slug: slug,
                        attributeSlug: attributeSlug,
                        attributeName: checkAttribute.name,
                        name: name,
                        value: null,
                        status: "true",
                        createdBy: admin.role
                    }

                    await AttributeFamily.create(info)
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Attribute Family Create Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Attribute Family not Created",
                                info: error
                            })
                        })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed! Attribute not found",
                        info: error
                    })
                }
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
            message: error.message || error,
        });
    }
    next();
}

const getAllAttributeFamily = async (req, res, next) => {
    try {
        const checkAttributeFamily = await AttributeFamily.findAll();
        const getAttribute = await Attribute.findAll();
        if (checkAttributeFamily.length !== 0) {
            const filterSubCategory = checkAttributeFamily.map((currElem) => {
                const id = currElem.id;
                const slug = currElem.slug;
                const attributeSlug = currElem.attributeSlug;
                const attribute = getAttribute.filter((item) => { return item.slug === currElem.attributeSlug });
                const attributeName = attribute.length !== 0 ? attribute[0].name : undefined;
                const name = currElem.name;
                const hiName = currElem.hiName;
                const value = currElem.value;
                const status = currElem.status;
                const createdBy = currElem.createdBy;
                const createdAt = currElem.createdAt;

                return {
                    id, slug, attributeSlug, attributeName, name, hiName, value, status, createdBy, createdAt
                }
            });
            return res.status(200).json({
                status: 200,
                message: "Attribute Family Data fetch successfully",
                info: filterSubCategory
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Attribute Family not exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
    next();
}

const getAttributeFamily = async (req, res, next) => {
    try {
        const attributeSlug = req.body.slug;
        if (isEmpty(attributeSlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select category",
            });
        } else {
            const getAttribute = await Attribute.findAll();
            const checkAttributeFamily = await AttributeFamily.findAll({ where: { attributeSlug: attributeSlug } })
            if (checkAttributeFamily.length !== 0) {
                const filterSubCategory = checkAttributeFamily.map((currElem) => {
                    const id = currElem.id;
                    const slug = currElem.slug;
                    const attributeSlug = currElem.attributeSlug;
                    const attribute = getAttribute.filter((item) => { return item.slug === currElem.attributeSlug });
                    const attributeName = attribute.length !== 0 ? attribute[0].name : undefined;
                    const name = currElem.name;
                    const hiName = currElem.hiName;
                    const value = currElem.value;
                    const status = currElem.status;
                    const createdBy = currElem.createdBy;
                    const createdAt = currElem.createdAt;

                    return {
                        id, slug, attributeSlug, attributeName, name, hiName, value, status, createdBy, createdAt
                    }
                });
                return res.status(200).json({
                    status: 200,
                    message: "Attribute Family Data fetch successfully",
                    info: filterSubCategory
                })
            } else {
                return res.status(400).jsom({
                    status: 400,
                    message: "Failed! Attribute Family not exist"
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

const updateAttributeFamily = async (req, res, next) => {
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
            const checkAttributeFamily = await AttributeFamily.findOne({ where: { slug: slug } });
            if (checkAttributeFamily.createdBy === admin.role || checkAttributeFamily.createdBy === "Admin") {
                const info = {
                    name: name
                }
                await AttributeFamily.update(info, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute Family Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute Family not updated",
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
            message: error.message || error,
        });
    }
    next();
}

const deleteAttributeFamily = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select attribute family",
            });
        } else {
            const checkAttributeFamily = await AttributeFamily.findOne({ where: { slug: slug } });
            if (checkAttributeFamily.createdBy === admin.role || checkAttributeFamily.createdBy === "Admin") {
                await AttributeFamily.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute Family delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute Family not deleted",
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
            message: error.message || error,
        });
    }
    next();
}

const changeAttributeStatusFamily = async (req, res, next) => {
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
            const checkAttributeFamily = await AttributeFamily.findOne({ where: { slug: slug } });
            if (checkAttributeFamily.createdBy === admin.role || checkAttributeFamily.createdBy === "Admin") {
                await AttributeFamily.update({ status: status }, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Attribute Family status Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Attribute Family status not updated",
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
            message: error.message || error,
        });
    }
    next();
}

const createAttributeFamilyLanguage = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { attrFamilySlug, mulLanguageName } = req.body;
        if (isEmpty(attrFamilySlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Attribute Family Slug is not found"
            })
        } else if (isEmpty(mulLanguageName)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! add at least one text"
            })
        } else {
            const checkAttributeFamily = await AttributeFamily.findOne({ where: { slug: attrFamilySlug } });
            if (checkAttributeFamily) {
                if (checkAttributeFamily.createdBy === admin.role || checkAttributeFamily.createdBy === "Admin") {
                    if (isEmpty(checkAttributeFamily.mulLanguageName) || checkAttributeFamily.mulLanguageName === null) {
                        await AttributeFamily.update({ mulLanguageName: mulLanguageName }, { where: { slug: attrFamilySlug } })
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
                        const newArray = JSON.parse(JSON.parse(checkAttributeFamily.mulLanguageName)).concat(JSON.parse(mulLanguageName));

                        await AttributeFamily.update({ mulLanguageName: JSON.stringify(newArray) }, { where: { slug: attrFamilySlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Attribute Family multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Attribute Family multiple language text not updated",
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
                    message: "Failed! Attribute family is not found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
    next();
}

module.exports = { addAttributeFamily, getAttributeFamily, getAllAttributeFamily, updateAttributeFamily, deleteAttributeFamily, changeAttributeStatusFamily, createAttributeFamilyLanguage }
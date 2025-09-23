const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { checkRoutePermission } = require("../Function/RouteAuth");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Category = db.category;

const addCategory = async (req, res, next) => {
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
                    mulLanguageName: null,
                    avatar: req.file !== undefined ? req.file.filename : null,
                    createdBy: admin.role,
                    status: "true"
                }

                await Category.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Category Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Category not Created",
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

const getCategory = async (req, res, next) => {
    try {
        const checkCategory = await Category.findAll();
        if (checkCategory.length !== 0) {
            const filterCategory = checkCategory.map((item) => {
                const id = item.id;
                const slug = item.slug;
                const name = item.name;
                const mulLanguageName = JSON.parse(item.mulLanguageName);
                const avatar = item.avatar;
                const status = item.status;
                const createdBy = item.createdBy;
                const createdAt = item.createdAt;

                return {
                    id, slug, name, mulLanguageName, avatar, status, createdBy, createdAt
                }
            })

            res.status(200).send({
                status: 200,
                message: "Category Data fetch successfully",
                info: filterCategory
            })
        } else {
            return res.status(400).send({
                status: 400,
                message: "Failed! Category is not found"
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

const updateCategory = async (req, res, next) => {
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
            const checkCategory = await Category.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                const info = {
                    name: name
                }
                await Category.update(info, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Category Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Category not updated",
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

const deleteCategory = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Slug is not found"
            })
        } else {
            const checkCategory = await Category.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                await Category.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Category delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Category not deleted",
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

const changeCategoryStatus = async (req, res, next) => {
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
            const checkCategory = await Category.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                await Category.update({ status: status }, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Category status Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Category status not updated",
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

const updateCategoryLanguages = async (req, res, next) => {
    try {
        const { catSlug, mulLanguageName } = req.body;
        if (isEmpty(catSlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Category Slug is not found"
            })
        } else if (isEmpty(mulLanguageName)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! add at least one text"
            })
        } else {
            const checkCategory = await Category.findOne({ where: { slug: catSlug } });
            if (checkCategory) {
                if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                    if (isEmpty(checkCategory.mulLanguageName) || checkCategory.mulLanguageName === null) {
                        await Category.update({ mulLanguageName: mulLanguageName }, { where: { slug: catSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Category multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Category multiple language text not updated",
                                    info: error
                                })
                            })
                    } else {
                        const newArray = JSON.parse(JSON.parse(checkCategory.mulLanguageName)).concat(JSON.parse(mulLanguageName));

                        await Category.update({ mulLanguageName: JSON.stringify(newArray) }, { where: { slug: catSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Category multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Category multiple language text not updated",
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
                    message: "Failed! Category is not found"
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


module.exports = { addCategory, getCategory, updateCategory, deleteCategory, changeCategoryStatus, updateCategoryLanguages }
const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { checkRoutePermission } = require("../Function/RouteAuth");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Category = db.category;
const SubCategory = db.subCategory;

const addSubCategory = async (req, res, next) => {
    try {
        const { categorySlug, name, url } = req.body;
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
                const checkCategory = await Category.findOne({ where: { slug: categorySlug } });
                if (checkCategory) {
                    const slug = await generateProductSlug(name)

                    const info = {
                        slug: slug,
                        categorySlug: categorySlug,
                        categoryName: checkCategory.name,
                        name: name,
                        avatar: req.file !== undefined ? req.file.filename : null,
                        status: "true",
                        createdBy: admin.role
                    }

                    await SubCategory.create(info)
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Sub Category Create Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Sub Category not Created",
                                info: error
                            })
                        })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed! Category not found"
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
};

const getAllSubCategory = async (req, res, next) => {
    try {
        const checkSubCategory = await SubCategory.findAll();
        const getAllCategory = await Category.findAll();
        if (checkSubCategory.length !== 0) {
            const filterSubCategory = checkSubCategory.map((currElem) => {
                const id = currElem.id;
                const slug = currElem.slug;
                const categorySlug = currElem.categorySlug;
                const category = getAllCategory.filter((item) => { return item.slug === currElem.categorySlug });
                const categoryName = category.length !== 0 ? category[0].name : undefined;
                const name = currElem.name;
                const mulLanguageName = JSON.parse(currElem.mulLanguageName);
                const avatar = currElem.avatar;
                const status = currElem.status;
                const createdBy = currElem.createdBy;
                const createdAt = currElem.createdAt;

                return {
                    id, slug, categorySlug, categoryName, name, mulLanguageName, avatar, status, createdBy, createdAt
                }
            });
            return res.status(200).json({
                status: 200,
                message: "sub Category Data fetch successfully",
                info: filterSubCategory
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Sub Category not exist"
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
};

const getSubCategory = async (req, res, next) => {
    try {
        const categorySlug = req.body.slug;
        if (isEmpty(categorySlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select category",
            });
        } else {
            const getAllCategory = await Category.findAll();
            const checkSubCategory = await SubCategory.findAll({ where: { categorySlug: categorySlug } })

            if (checkSubCategory.length !== 0) {
                const filterSubCategory = checkSubCategory.map((currElem) => {
                    const id = currElem.id;
                    const slug = currElem.slug;
                    const categorySlug = currElem.categorySlug;
                    const category = getAllCategory.filter((item) => { return item.slug === currElem.categorySlug });
                    const categoryName = category.length !== 0 ? category[0].name : undefined;
                    const name = currElem.name;
                    const hiName = currElem.hiName;
                    const avatar = currElem.avatar;
                    const status = currElem.status;
                    const createdBy = currElem.createdBy;
                    const createdAt = currElem.createdAt;

                    return {
                        id, slug, categorySlug, categoryName, name, hiName, avatar, status, createdBy, createdAt
                    }
                });
                return res.status(200).json({
                    status: 200,
                    message: "sub Category Data fetch successfully",
                    info: filterSubCategory
                })
            } else {
                return res.status(400).jsom({
                    status: 400,
                    message: "Failed! Sub Category not exist"
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
};

const updateSubCategory = async (req, res, next) => {
    try {
        const { name, hiName, slug } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage
            })
        } else {
            const checkCategory = await SubCategory.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                const info = {
                    name: name,
                    hiName: hiName
                }
                await SubCategory.update(info, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Sub Category Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Sub Category not updated",
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
};

const deleteSubCategory = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select sub-category",
            });
        } else {
            const checkCategory = await SubCategory.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                await SubCategory.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Sub Category delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Sub Category not deleted",
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
};

const changeSubCategoryStatus = async (req, res, next) => {
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
            const checkCategory = await SubCategory.findOne({ where: { slug: slug } });
            if (checkCategory.createdBy === admin.role || checkCategory.createdBy === "Admin") {
                await SubCategory.update({ status: status }, { where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Sub Category status Update Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Sub Category status not updated",
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
};

const createSubCategoryMulText = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { subCatSlug, mulLanguageName } = req.body;
        if (isEmpty(subCatSlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Sub-Category Slug is not found"
            })
        } else if (isEmpty(mulLanguageName)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! add at least one text"
            })
        } else {
            const checkSubCategory = await SubCategory.findOne({ where: { slug: subCatSlug } });
            if (checkSubCategory) {
                if (checkSubCategory.createdBy === admin.role || checkSubCategory.createdBy === "Admin") {
                    if (isEmpty(checkSubCategory.mulLanguageName) || checkSubCategory.mulLanguageName === null) {
                        await SubCategory.update({ mulLanguageName: mulLanguageName }, { where: { slug: subCatSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Sub-Category multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Sub-Category multiple language text not updated",
                                    info: error
                                })
                            })
                    } else {
                        const newArray = JSON.parse(JSON.parse(checkSubCategory.mulLanguageName)).concat(JSON.parse(mulLanguageName));

                        await SubCategory.update({ mulLanguageName: JSON.stringify(newArray) }, { where: { slug: subCatSlug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Sub-Category multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Sub-Category multiple language text not updated",
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
            message: error.message || error,
        });
    }
    next();
}

module.exports = {
    addSubCategory,
    getAllSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    changeSubCategoryStatus,
    createSubCategoryMulText,
    createSubCategoryMulText
};

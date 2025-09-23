const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Blog = db.blog;
const Category = db.category;

const createBlog = async (req, res, next) => {
    try {
        const { name, description, categoryId, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse,
            });
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const generateSlug = await generateProductSlug(name);
                const info = {
                    name: name,
                    slug: generateSlug,
                    description: description,
                    categoryId: categoryId,
                    avatar: req.file !== undefined ? req.file.filename : null,
                    status: "true",
                    createdBy: admin.role
                }

                await Blog.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Blog Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Blog not Created",
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

const getBlog = async (req, res, next) => {
    try {
        const checkBlog = await Blog.findAll({ where: { status: "true" } });
        const checkCategory = await Category.findAll();
        if (checkBlog.length !== 0) {
            const filterBlog = checkBlog.map((item, index) => {
                const id = item.id;
                const slug = item.slug;
                const checkCat = checkCategory.filter((currElem) => { return currElem.id == item.categoryId })
                const categoryId = item.categoryId;
                const categoryName = checkCat[0].name;
                const title = item.name;
                const description = item.description;
                const avatar = item.avatar;
                const status = item.status;
                const createdBy = item.createdBy;
                const createdAt = item.createdAt;

                return {
                    id, slug, categoryId, categoryName, title, description, avatar, status, createdBy, createdAt
                }
            })

            return res.status(200).json({
                status: 200,
                message: "Blog data fetch successfull",
                info: filterBlog
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Blog is not found"
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

const updateBlog = async (req, res, next) => {
    try {
        const { name, description, id } = req.body;
        const admin = req.admin;
        const errorResponse = ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else {
            const checkBlog = await Blog.findOne({ where: { id: id } });
            if (checkBlog) {
                if (checkBlog.createdBy === admin.role || checkBlog.createdBy === "Admin") {
                    const info = {
                        name: name,
                        description: description,
                        avatar: req.file !== undefined ? req.file.filename : checkBlog.avatar,
                        status: "true"
                    }

                    if (req.file !== undefined || !isEmpty(req.file.filename)) {
                        const imageDir = path.join(__dirname, "..", "..", "files", checkBlog.avatar);
                        await fs.unlinkSync(imageDir);
                    }

                    await Blog.update(info, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Blog Update Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).send({
                                status: 300,
                                message: "Failed! Blog not updated",
                                info: error
                            })
                        })

                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed!Authorization Failed"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Blog is not found"
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

const deleteBlog = async (req, res, next) => {
    try {
        const id = req.body.id;
        const admin = req.admin;

        if (isEmpty(id)) {
            return res.status(300).send({
                status: 300,
                message: "Failed! Blog id is empty",
            });
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else {
            const checkBlog = await Blog.findOne({ where: { id: id } });
            if (checkBlog) {
                if (checkBlog.createdBy === admin.role || checkBlog.createdBy === "Admin") {
                    const imageDir = path.join(__dirname, "..", "..", "files", checkBlog.avatar);
                    await fs.unlinkSync(imageDir);

                    await Blog.destroy({ where: { id: id } })
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Blog delete Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).send({
                                status: 300,
                                message: "Failed! Blog not deleted",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).send({
                        status: 300,
                        message: "Authorization Failed"
                    })
                }

            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Blog is not found"
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

const chnageBlogStatus = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { id, status } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkBlog = await Blog.findOne({ where: { id: id } });
            if (checkBlog) {
                if (checkBlog.createdBy === admin.role || checkBlog.createdBy === "Admin") {
                    await Blog.update({ status: true }, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Blog chnage status Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).send({
                                status: 300,
                                message: "Failed! Blog status not updated",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Authorization Failed"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Blog is not found"
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

module.exports = { createBlog, updateBlog, deleteBlog, getBlog, chnageBlogStatus }
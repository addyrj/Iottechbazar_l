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
              const categoryName = checkCat.length > 0 ? checkCat[0].name : null; // or "Unknown"

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
        
        // Fixed: Added await for ErrorNullResponse
        const errorResponse = await ErrorNullResponse(req.body);
        
        if (!admin) {
            return res.status(401).json({
                status: 401,
                message: "Failed! You are not authorized",
            });
        } else if (errorResponse.length !== 0) {
            return res.status(400).json({
                status: 400,
                message: errorResponse,
            });
        } else {
            const checkBlog = await Blog.findOne({ where: { id: id } });
            if (checkBlog) {
                // Fixed authorization logic
                const isAuthorized = checkBlog.createdBy === admin.role || 
                                   admin.role === "Admin";
                
                if (isAuthorized) {
                    const info = {
                        name: name,
                        description: description,
                        status: "true"
                    }

                    // Handle file upload if present
                    if (req.file !== undefined && req.file.filename) {
                        info.avatar = req.file.filename;
                        
                        // Delete old image if new one is uploaded
                        if (checkBlog.avatar) {
                            try {
                                const imageDir = path.join(__dirname, "..", "..", "files", checkBlog.avatar);
                                if (fs.existsSync(imageDir)) {
                                    await fs.unlinkSync(imageDir);
                                }
                            } catch (fileError) {
                                console.error('Error deleting old image:', fileError);
                                // Continue with update even if image deletion fails
                            }
                        }
                    }

                    await Blog.update(info, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Blog Update Successful",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(500).send({
                                status: 500,
                                message: "Failed! Blog not updated",
                                info: error.message
                            })
                        })

                } else {
                    return res.status(403).json({
                        status: 403,
                        message: "Failed! Authorization Failed"
                    })
                }
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Failed! Blog not found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message
        })
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.body;
        const admin = req.admin;

        console.log('Delete Blog Request:', { id, admin: admin?.id });

        // Comprehensive ID validation
        if (id === undefined || id === null || id === "") {
            return res.status(400).send({
                status: 400,
                message: "Failed! Blog id is required",
            });
        }

        // Convert to number and validate
        const numericId = Number(id);
        if (isNaN(numericId) || numericId <= 0) {
            return res.status(400).send({
                status: 400,
                message: "Failed! Blog id must be a valid positive number",
            });
        }

        // Admin authorization check
        if (!admin) {
            return res.status(401).send({
                status: 401,
                message: "Failed! You are not authorized",
            });
        }

        // Check if blog exists
        const checkBlog = await Blog.findOne({ where: { id: numericId } });
        
        if (!checkBlog) {
            return res.status(404).send({
                status: 404,
                message: "Failed! Blog not found",
            });
        }

        // Authorization check - user can only delete their own blogs or admin can delete any
        const isAuthorized = checkBlog.createdBy === admin.role || 
                           checkBlog.createdBy === "Admin" || 
                           admin.role === "Admin";

        if (!isAuthorized) {
            return res.status(403).send({
                status: 403,
                message: "Failed! You are not authorized to delete this blog",
            });
        }

        // Delete associated image file if it exists
        if (checkBlog.avatar) {
            try {
                const imageDir = path.join(__dirname, "..", "..", "files", checkBlog.avatar);
                
                // Check if file exists before deleting
                if (fs.existsSync(imageDir)) {
                    await fs.unlink(imageDir);
                    console.log('Image file deleted:', checkBlog.avatar);
                } else {
                    console.log('Image file not found, skipping deletion:', checkBlog.avatar);
                }
            } catch (fileError) {
                console.error('Error deleting image file:', fileError);
                // Continue with blog deletion even if image deletion fails
            }
        }

        // Delete blog from database
        const result = await Blog.destroy({ 
            where: { id: numericId } 
        });

        if (result) {
            return res.status(200).send({
                status: 200,
                message: "Blog deleted successfully",
                data: {
                    deletedBlogId: numericId,
                    imageDeleted: !!checkBlog.avatar
                }
            });
        } else {
            return res.status(500).send({
                status: 500,
                message: "Failed! Blog deletion failed unexpectedly",
            });
        }

    } catch (error) {
        console.error('Delete Blog Error:', error);
        
        return res.status(500).json({
            status: 500,
            error: true,
            message: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

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
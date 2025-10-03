const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const isEmpty = require("lodash.isempty");
const jwt = require("jsonwebtoken");

const Permission = db.permission;
const PermissionFamily = db.permissionFamily;
const Role = db.role;

const addPermission = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { Name, Status, Group } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Token is invalid",
            });
        } else {
            let slug = jwt.sign({ name: Name }, process.env.SECRET_KEY_SLUG);
            const info = {
                slug: slug,
                group: Group,
                name: Name,
                addedBy: admin.role,
                status: Status
            };
            if (admin.role === "Admin") {
                await Permission.create(info)
                    .then((result) => {
                        res.status(200).send({
                            status: 200,
                            message: "Permission created successfully",
                            data: result,
                        });
                    })
                    .catch((error) => {
                        res.status(300).send({
                            status: 300,
                            message: "Failed! Permission not created",
                            data: error,
                        });
                    });
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! You are not authorized",
                });
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

const getPermission = async (req, res, next) => {
    try {
        const getPermission = await Permission.findAll();
        if (getPermission.length !== 0) {
            const filterPermission = getPermission.map((currElem) => {
                const id = currElem.id;
                const slug = currElem.slug;
                const group = currElem.group;
                const name = currElem.name;
                const addedBy = currElem.addedBy;
                const status = currElem.status;
                const createdAt = currElem.createdAt;
                return {
                    id,
                    slug,
                    group,
                    name,
                    addedBy,
                    status,
                    createdAt,
                };
            });

            res.status(200).send({
                status: 200,
                message: "Permission data fetch successfully",
                info: filterPermission,
            });
        } else {
            res.status(400).send({
                status: 400,
                message: "Failed! Permission not found",
            });
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

const updatePermission = async (req, res, next) => {
    try {
        const { Name, AddedBy, Slug } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: Slug },
            });
            if (checkPermission) {
                if (checkPermission.addedBy === AddedBy) {
                    await Permission.update(
                        { name: Name, updatedBy: AddedBy },
                        { where: { slug: Slug } }
                    )
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Permission update successfully",
                                data: result,
                            });
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Permmission update failed",
                                data: error,
                            });
                        });
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! You are not authorized",
                    });
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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

const deletePermission = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        const admin = req.admin;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Permission slug is not found",
            });
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Token is invalid",
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: slug },
            });
            if (checkPermission) {
                if (admin.role === "Admin") {
                    await Permission.destroy({ where: { slug: slug } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Permission delete successfully",
                                data: result,
                            });
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Permmission delete failed",
                                data: error,
                            });
                        });
                } else {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! You are not authorized"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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

const changePermissionStatus = async (req, res, next) => {
    try {
        const { Slug, Status } = req.body;
        const admin = req.admin;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Token is invalid",
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: Slug },
            });
            if (checkPermission) {
                if (admin.role === "Admin") {
                    await Permission.update({ status: Status }, { where: { slug: Slug } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Permission status change successfully",
                                data: result,
                            });
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Permmission status change failed",
                                data: error,
                            });
                        });
                } else {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! You are not authorized"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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


const addPermissionFamily = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { Name, Status, Url, PermissionSlug, NavbarShown } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Token is invalid",
            });
        } else {
            const checkPermission = await Permission.findOne({ where: { slug: PermissionSlug } });
            if (checkPermission) {
                let slug = jwt.sign({ name: Name }, process.env.SECRET_KEY_SLUG);
                const info = {
                    slug: slug,
                    permissionSlug: PermissionSlug,
                    group: checkPermission.group,
                    name: Name,
                    url: Url,
                    navbarShown: NavbarShown,
                    addedBy: admin.role,
                    status: Status,
                };

                await PermissionFamily.create(info)
                    .then((result) => {
                        res.status(200).send({
                            status: 200,
                            message: "Permission Family created successfully",
                            data: result,
                        });
                    })
                    .catch((error) => {
                        res.status(300).send({
                            status: 300,
                            message: "Failed! Permission Family not created",
                            data: error,
                        });
                    });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission is not exist"
                });
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

const getPermissionFamily = async (req, res, next) => {
    try {
        const getPermissionFamily = await PermissionFamily.findAll();
        if (getPermissionFamily.length !== 0) {
            const filterPermission = getPermissionFamily.map((currElem) => {
                const id = currElem.id;
                const slug = currElem.slug;
                const permissionSlug = currElem.permissionSlug;
                const group = currElem.group;
                const name = currElem.name;
                const url = currElem.url;
                const navbarShown = currElem.navbarShown;
                const addedBy = currElem.addedBy;
                const status = currElem.status;
                const createdAt = currElem.createdAt;
                return {
                    id,
                    slug,
                    permissionSlug,
                    group,
                    name,
                    url,
                    navbarShown,
                    addedBy,
                    status,
                    createdAt
                };
            });

            res.status(200).send({
                status: 200,
                message: "Permission Family data fetch successfully",
                info: filterPermission,
            });
        } else {
            res.status(400).send({
                status: 400,
                message: "Failed! Permission Family not found",
            });
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

const updatePermissionFamily = async (req, res, next) => {
    try {
        const { Name, AddedBy, Slug, Url } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: Slug },
            });
            if (checkPermission) {
                if (checkPermission.addedBy === AddedBy) {
                    await Permission.update(
                        { name: Name, url: Url, updatedBy: AddedBy },
                        { where: { slug: Slug } }
                    )
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Permission update successfully",
                                data: result,
                            });
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Permmission update failed",
                                data: error,
                            });
                        });
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Not Authorized",
                    });
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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

const deletePermissionFamily = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Permission slug is not found",
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: slug },
            });
            if (checkPermission) {
                await Permission.destroy({ where: { slug: slug } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Permission delete successfully",
                            data: result,
                        });
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Permmission delete failed",
                            data: error,
                        });
                    });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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

const changeStatusPermissionFamily = async (req, res, next) => {
    try {
        const { Slug, Status } = req.body;
        const errorMessage = await ErrorNullResponse(req.body);
        if (errorMessage.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorMessage,
            });
        } else {
            const checkPermission = await Permission.findOne({
                where: { slug: Slug },
            });
            if (checkPermission) {
                await Permission.update({ status: Status }, { where: { slug: Slug } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Permission status change successfully",
                            data: result,
                        });
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Permmission status change failed",
                            data: error,
                        });
                    });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Permission not found",
                });
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

const checkRouteAuthPermission = async (req, res, next) => {
    try {
        const admin = req.admin;
        const routeUrl = req.body.routeUrl;
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else if (isEmpty(routeUrl)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Url is not exist",
            });
        } else {
            const checkRole = await Role.findOne({ where: { slug: admin.roleSlug } });
            if (checkRole) {
                if (checkRole.name === "Admin") {
                    res.status(200).send({
                        status: 200,
                        message: "Authorization successfull",
                    });
                } else {
                    const permissionList = JSON.parse(JSON.parse(checkRole.permission));
                    if (permissionList.length !== 0) {
                        const checkPermission = await PermissionFamily.findOne({
                            where: { url: routeUrl },
                        });
                        if (checkPermission) {
                            const filterAuthPermission = permissionList.filter((item) => {
                                return item === checkPermission.slug;
                            });
                            if (filterAuthPermission.length !== 0) {
                                res.status(200).send({
                                    status: 200,
                                    message: "Authorization Successfull",
                                    info: true,
                                });
                            } else {
                                res.status(200).send({
                                    status: 200,
                                    message: "Failed! You are not authorized",
                                    info: false,
                                });
                            }
                        } else {
                            res.status(400).send({
                                status: 400,
                                message: "Failed! Permission is not exist",
                            });
                        }
                    } else {
                        res.status(400).send({
                            status: 400,
                            message: "Failed! You have not any authorized permission",
                        });
                    }
                }
            } else {
                res.status(400).send({
                    status: 400,
                    message: "Failed! You have not authorized to this operation",
                });
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

module.exports = {
    addPermission,
    getPermission,
    deletePermission,
    updatePermission,
    changePermissionStatus,
    checkRouteAuthPermission,
    addPermissionFamily,
    getPermissionFamily,
    updatePermissionFamily,
    deletePermissionFamily,
    changeStatusPermissionFamily
};

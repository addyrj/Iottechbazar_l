const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { checkRoutePermission } = require("../Function/RouteAuth");

const LegalPage = db.legalPage;

const createPage = async (req, res, next) => {
    try {
        const { title, url, pageUrl, value } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const admin = req.admin;
        if (errorResponse.length !== 0) {
            res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else if (!admin) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkPermission = await checkRoutePermission(admin, pageUrl);
            if (checkPermission === true) {
                const info = {
                    title: title,
                    url: url,
                    value: value,
                    status: "true",
                    createdBy: admin.name
                }

                await LegalPage.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Legal Page Created Successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Page is not created",
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

const getPage = async (req, res, next) => {
    try {
        const checkPage = await LegalPage.findAll();
        if (checkPage.length !== 0) {
            return res.status(200).send({
                status: 200,
                message: "Legal page data fetch successfully",
                info: checkPage
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! LegalPage is not found"
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

const updatePage = async (req, res, next) => {
    try {
        const { id, title, url, value } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkPage = await LegalPage.findOne({ where: { id: id } });
            if (checkPage) {
                if (checkPage.createdBy === admin.role || checkPage.createdBy === "Admin") {
                    const info = {
                        title: title,
                        url: url,
                        value: value
                    }

                    await LegalPage.update(info, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Legal Page update Successfully",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Page is not updated",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! You have not authorized"
                    })
                }

            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Page is not found"
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

const deletePage = async (req, res, next) => {
    try {
        const id = req.body.id;
        const admin = req.admin;

        if (!id) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Page id is not found"
            });
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            });
        }

        const checkPage = await LegalPage.findOne({ where: { id: id } });

        if (checkPage && (checkPage.createdBy === admin.role || checkPage.createdBy === "Admin")) {
            const result = await LegalPage.destroy({ where: { id: id } });

            return res.status(200).json({
                status: 200,
                message: "Legal Page deleted Successfully",
                info: result   // Sequelize returns count of deleted rows
            });
        } else {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
};


const changePageStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const admin = req.admin;
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkPage = await LegalPage.findOne({ where: { id: id } });
            if (checkPage) {
                if (checkPage.createdBy === admin.role || checkPage.createdBy === "Admin") {
                    await LegalPage.update({ status: status }, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Legal Page status update Successfully",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Page status not updated",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! You have not authorized"
                    })
                }
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! Page is not exist"
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

const getPageClient = async (req, res, next) => {
    try {
        const url = req.body.url;
        if (isEmpty(url)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Page id is not found"
            })
        } else {
            const checkPage = await LegalPage.findOne({ where: { url: url } });
            if (checkPage) {
                return res.status(200).send({
                    status: 200,
                    message: "Legal page data fetch successfully",
                    info: checkPage
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Legal Page is not found"
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

module.exports = { createPage, getPage, updatePage, deletePage, changePageStatus, getPageClient }
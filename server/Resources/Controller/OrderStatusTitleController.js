const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const OrderStatus = db.orderStatusTitle;

const addOrderStatusTitle = async (req, res, next) => {
    try {
        const { name, color, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).json({
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
                const slug = await generateProductSlug(name);
                const info = {
                    slug: slug,
                    name: name,
                    color: color,
                    status: "true"
                }

                await OrderStatus.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Order Status Title Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Order Status Title not Created",
                            info: error
                        })
                    })
            } else {
                return res.status(300).send({
                    status: 300,
                    message: "Failed! You are not authorized person"
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

const getOrderStatusTitle = async (req, res, next) => {
    try {
        const getTitle = await OrderStatus.findAll();
        if (getTitle.length !== 0) {
            const filterRsult = await getTitle.map((item, index) => {
                const id = item.id;
                const slug = item.slug;
                const title = item.name;
                const mulLanguage = item.mulLanguage;
                const color = item.color;
                const status = item.status;

                return { id, slug, title, color, mulLanguage, status }
            });
            return res.status(200).json({
                status: 200,
                message: "Order Status Title Data fetch sucessfull",
                info: filterRsult
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Order Status Title not found",
                info: getTitle
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
}

const updateOrderStatusTitle = async (req, res, next) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
}

const deleteOrderStatusTitle = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
}

const changeStatusOrderTitle = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
}

module.exports = { addOrderStatusTitle, getOrderStatusTitle }
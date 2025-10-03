const isEmpty = require("lodash.isempty");
const db = require("../../DB/config")

const Cart = db.cart;
const Order = db.order;
const OrderDetail = db.orderDetail;
const User = db.user;

const sendCartAvailablity = async (req, res, next) => {
    try {
        const { userSlug } = req.body;
        const admin = req.admin;

        if (isEmpty(userSlug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! User slug is not found"
            })
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized",
            });
        } else {
            const checkUser = await User.findOne({ where: { slug: userSlug } });
            if (checkUser) {
                const checkCart = await Cart.findAll({ where: { userSlug: userSlug } })
                if (checkCart.length !== 0) {

                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed! Cart is not exist"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! User is not registred"
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

const sendCartOffer = (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

MediaSourceHandle.exports = { sendCartAvailablity, sendCartOffer }
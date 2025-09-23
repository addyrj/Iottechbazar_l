const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Coupon = db.coupon;

const createCoupons = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { coupon, categoryId, discountType, minPurchaseAmount, discountValue, startDate, expiryDate, url } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);

        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const slug = await generateProductSlug(coupon);
                const info = {
                    slug: slug,
                    coupon: coupon,
                    categoryId: categoryId,
                    discountType: discountType,
                    min_purchase_amount: minPurchaseAmount,
                    discountValue: discountValue,
                    startDate: startDate,
                    expireDate: expiryDate,
                    avatar: req.file !== undefined ? req.file.filename : null,
                    status: "true",
                    createdBy: admin.role
                }

                await Coupon.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Coupon Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Coupon not Created",
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
}

const getCoupons = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkCoupons = await Coupon.findAll();
            if (checkCoupons.length !== 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Coupon data fetch successfully",
                    info: checkCoupons
                })
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Failed! Coupon is not found"
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

const getCouponDetail = async (req, res, next) => {
    try {
        const amount = req.body.amount;
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const updateCoupon = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const deleteCoupon = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const chnageCouponStatus = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { createCoupons, getCoupons, deleteCoupon, updateCoupon, chnageCouponStatus, getCouponDetail }
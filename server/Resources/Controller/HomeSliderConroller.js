const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const fs = require("fs")
const path = require('path');

const Product = db.product;
const Slider = db.homeSlider;

const createSlider = async (req, res, next) => {
    try {
        const { title, type, proSlug, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);

        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const info = {
                    title: title,
                    type: type,
                    productSlug: proSlug,
                    avatar: req.file !== undefined ? req.file.filename : null,
                    status: "true",
                    createdBy: admin.role

                }
                await Slider.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Slider created successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Failed! Slider not created",
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

const getSlider = async (req, res, next) => {
    try {
        const checkSlider = await Slider.findAll({ where: { status: "true" } });
        const checkProduct = await Product.findAll();

        if (checkSlider.length !== 0) {
            const filterList = checkSlider.map((item, index) => {
                const id = item.id;
                const type = item.type;
                const title = item.title;
                const avatar = item.avatar;
                const createdBy = item.createdBy;
                const productData = checkProduct?.filter((currElem) => { return currElem.slug === item.productSlug })
                return {
                    id, title, type, avatar, createdBy, productData
                }
            });
            await Promise.all(filterList).then((result) => {
                res.status(200).json({
                    status: 200,
                    message: "Slider data fetch successfully",
                    info: result
                })
            }).catch((error) => {
                res.status(300).json({
                    status: 300,
                    message: "Faild! Slider is not found",
                    info: error
                })
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Slider is not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

const updateSlider = async (req, re, next) => {
    try {
        const { title, type, proSlug, url, status, id } = req.body;
        const admin = req.admin;
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
            const checkSlider = await Slider.findOne({ where: { id: id } });
            if (checkSlider) {
                if (checkSlider.createdBy === admin.role || checkSlider.createdBy === "Admin") {
                    const info = {
                        title: title,
                        type: type,
                        productSlug: proSlug,
                        avatar: req.file !== undefined ? req.file.filename : checkSlider.avatar,
                        status: status
                    }

                    await Slider.update(info)
                        .then((result) => {
                            return res.status(200).send({
                                status: 200,
                                message: "Slider Update Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).send({
                                status: 300,
                                message: "Failed! Slider not updated",
                                info: error
                            })
                        })
                } else {
                    return res.status(300).send({
                        status: 300,
                        message: "Failed! Authorization failed"
                    })
                }
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Failed! Slider is not found"
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

const deleteSlider = async (req, re, next) => {
    try {
        const id = req.body.id;
        const admin = req.admin;
        if (isEmpty(id)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Slider id is empty"
            })
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkSlider = await Slider.findOne({ where: { id: id } });

            if (checkSlider) {
                const imageDir = path.join(__dirname, "..", "..", "files", imageName);
                await fs.unlinkSync(imageDir);

                await Slider.destroy({ where: { id: id } })
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Slider Delete Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Slider not deleted",
                            info: error
                        })
                    })
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Failed! Slider is not found"
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

const changeSliderStatus = async (req, re, next) => {
    try {
        const { id, status } = req.body;
        const admin = req.admin;
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
            await Slider.update({ status: status }, { where: { id: id } })
                .then((result) => {
                    return res.status(200).send({
                        status: 200,
                        message: "Slider chnage status Successfull",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).send({
                        status: 300,
                        message: "Failed! Slider status not updated",
                        info: error
                    })
                })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
}

module.exports = { createSlider, getSlider, updateSlider, deleteSlider, changeSliderStatus }
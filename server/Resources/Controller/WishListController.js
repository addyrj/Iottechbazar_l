const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");

const Wishlist = db.wishlist;
const Product = db.product;

const addWishList = async (req, res, next) => {
    try {
        const { productId, productSlug } = req.body;
        const user = req.user;
        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else if (!user) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkWishlist = await Wishlist.findOne({ where: { productId: productId, productSlug: productSlug } });
            if (!checkWishlist) {
                const info = {
                    userSlug: user.slug,
                    productId: productId,
                    productSlug: productSlug
                }
                await Wishlist.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Product Add to Wishlist Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Wishlist not Created",
                            info: error
                        })
                    })
            } else {
                return res.status(300).send({
                    status: 300,
                    message: "Failed! Product is alraedy add in wishlist"
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

const getWishList = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkWishList = await Wishlist.findAll({ where: { userSlug: user.slug } });
            if (checkWishList.length !== 0) {
                const checkProduct = await Product.findAll();
                const filterWishList = checkWishList.map((item, index) => {
                    const id = item.id;
                    const userSlug = user.slug;
                    const productId = item.productId;
                    const productSlug = item.productSlug;
                    const cartCount = item.cartCount;
                    const filterProduct = checkProduct.filter((currElem) => { return currElem.slug === productSlug });
                    const wishName = filterProduct[0].name;
                    const wishImage = filterProduct[0].primaryImage;
                    const wishPrice = filterProduct[0].productPrice;
                    const wishSellPrice = filterProduct[0].productSpecialPrice;
                    const wishStock = filterProduct[0].stock;
                    const wishBasePrice = parseInt(filterProduct[0].basePrice);
                    const discount = filterProduct[0].discount;
                    const discountType = filterProduct[0].discountType;

                    return { id, userSlug, productId, cartCount, wishImage, productSlug, wishPrice, wishSellPrice, wishName, wishStock, wishBasePrice, discount, discountType }

                });

                res.status(200).json({
                    status: 200,
                    message: "Wishlist data fetch successfully",
                    info: filterWishList
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Wishlist is not found"
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

const removeWishList = async (req, res, next) => {
    try {
        const wishId = req.body.wishId;
        const user = req.user;
        if (isEmpty(wishId)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Wish item is not found"
            })
        } else if (!user) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkWishList = await Wishlist.findOne({ where: { id: wishId } });
            if (checkWishList) {
                await Wishlist.destroy({ where: { id: wishId } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Wishlist Item remove successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Wishlist item not removed",
                            info: error
                        })
                    })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Failed! Wishlist item is not exist"
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

module.exports = { addWishList, getWishList, removeWishList }
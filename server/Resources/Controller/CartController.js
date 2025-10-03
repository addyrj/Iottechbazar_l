const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");

const Cart = db.cart;
const Product = db.product;
const User = db.user;

const addCart = async (req, res, next) => {
    try {
        const { productId, productSlug, cartCount } = req.body;
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
            const checkProduct = await Product.findOne({ where: { slug: productSlug, id: productId } });
            if (checkProduct) {
                const checkCartExist = await Cart.findOne({ where: { productId: productId, productSlug: productSlug } })
                if (checkCartExist) {
                    const info = {
                        cartCount: cartCount
                    }

                    await Cart.update(info, { where: { id: checkCartExist.id } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Product Add to Cart Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Cart not Created",
                                info: error
                            })
                        })
                } else {
                    const info = {
                        userSlug: user.slug,
                        productId: productId,
                        productSlug: productSlug,
                        cartCount: cartCount
                    }

                    await Cart.create(info)
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Product Add to Cart Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Cart not Created",
                                info: error
                            })
                        })
                }

            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Product is not found"
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

const getAdminCart = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkCart = await Cart.findAll();
            const checkUser = await User.findAll();
            if (checkUser.length !== 0) {
                if (checkCart.length !== 0) {
                    const checkProduct = await Product.findAll();
                    const filterCartItem = checkCart.map((item, index) => {
                        const user = checkUser.filter((currElem) => { return currElem.slug === item.userSlug })
                        const id = item.id;
                        const userSlug = user[0].slug;
                        const userName = user[0].name;
                        const userEmail = user[0].email;
                        const userContact = user[0].contact;
                        const productId = item.productId;
                        const productSlug = item.productSlug;
                        const cartCount = item.cartCount;
                        const filterProduct = checkProduct.filter((currElem) => { return currElem.slug === productSlug });
                        const cartImage = filterProduct[0].primaryImage;
                        const cartPrice = filterProduct[0].productPrice;
                        const cartName = filterProduct[0].name;
                        const createdAt = item.createdAt;
                        const cartSellPrice = filterProduct[0].productSpecialPrice;
                        const cartItemtotalPrice = parseInt(filterProduct[0].productPrice) * parseInt(cartCount);
                        const cartItemtotalSellPrice = parseInt(filterProduct[0].productSpecialPrice) * parseInt(cartCount)

                        return { id, userSlug, userName, userEmail, userContact, productId, cartName, cartCount, cartImage, cartPrice, cartSellPrice, cartItemtotalPrice, cartItemtotalSellPrice, filterProduct, createdAt }

                    });

                    res.status(200).json({
                        status: 200,
                        message: "Cart data fetch successfully",
                        info: filterCartItem
                    })
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed! Cart is empty"
                    })
                }
            } else {
                return res.status(400).josn({
                    status: 400,
                    message: "Failed! User not found"
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

const getCart = async (req, res, next) => {
    try {
        const user = req.user;
        let totalPrice;
        let priceArray;
        if (!user) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkCart = await Cart.findAll({ where: { userSlug: user.slug } });
            if (checkCart.length !== 0) {
                const checkProduct = await Product.findAll();
                const filterCartItem = checkCart.map((item, index) => {
                    const id = item.id;
                    const userSlug = user.slug;
                    const productId = item.productId;
                    const productSlug = item.productSlug;
                    const cartCount = item.cartCount;
                    const filterProduct = checkProduct.filter((currElem) => { return currElem.slug === productSlug });
                    const cartName = filterProduct[0].name;
                    const cartImage = filterProduct[0].primaryImage;
                    const cartPrice = filterProduct[0].productPrice;
                    const cartSellPrice = filterProduct[0].productSpecialPrice;
                    const cartStock = filterProduct[0].stock;
                    const basePrice = parseInt(filterProduct[0].basePrice) * parseInt(cartCount);
                    const discount = filterProduct[0].discount;
                    const discountType = filterProduct[0].discountType;
                    const cartItemtotalPrice = parseInt(filterProduct[0].productPrice) * parseInt(cartCount);
                    const cartItemtotalSellPrice = parseInt(filterProduct[0].productSpecialPrice) * parseInt(cartCount)

                    return { id, userSlug, productId, cartCount, cartImage, cartPrice, cartSellPrice, cartItemtotalPrice, cartItemtotalSellPrice, cartName, cartStock, basePrice, discount, discountType }

                });

                res.status(200).json({
                    status: 200,
                    message: "Cart data fetch successfully",
                    info: filterCartItem
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Cart is not found"
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

const updateCartItem = async (req, res, next) => {
    try {
        const cartItem = req.body.cartItem;
        const newData = JSON.parse(cartItem);
        const updateCart = newData?.map((item) => {
            const { id, count } = item;
            const checkCart = Cart.findOne({ where: { id: id } });
            if (checkCart) {
                return Cart.update({ cartCount: count }, { where: { id: id } });
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "Failed! Cart item is not exist"
                })
            }
        })

        await Promise.all(updateCart).then((result) => {
            res.status(200).json({
                status: 200,
                message: "Cart Item update Successfully",
                info: result
            })
        }).catch((error) => {
            res.status(300).json({
                status: 300,
                message: "Faild! Cart Item not updated",
                info: error
            })
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const removeCart = async (req, res, next) => {
    try {
        const cartId = req.body.cartId;
        if (isEmpty(cartId)) {
            return res.status(300).send({
                status: 300,
                message: "Failed! Cart is not found"
            })
        } else {
            const checkCart = await Cart.findOne({ where: { id: cartId } });
            if (checkCart) {
                await Cart.destroy({ where: { id: cartId } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Cart Item remove successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Cart item not removed",
                            info: error
                        })
                    })
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Failed! Cart item is not exist"
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

module.exports = { addCart, getCart, removeCart, updateCartItem, getAdminCart }
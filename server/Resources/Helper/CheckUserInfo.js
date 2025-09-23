const db = require("../../DB/config")

const Cart = db.cart;
const Product = db.product;
const WishList = db.wishlist;

const checkUserCart = async (user) => {
    try {
        const checkCart = await Cart.findAll({ where: { userSlug: user.slug } });
        if (checkCart.length !== 0) {
            const checkProduct = await Product.findAll();
            if (checkProduct) {
                const filterCartItem = checkCart.map((item, index) => {
                    const id = item.id;
                    const userSlug = user.slug;
                    const productId = item.productId;
                    const productSlug = item.productSlug;
                    const cartCount = item.cartCount;
                    const filterProduct = checkProduct.filter((currElem) => { return currElem.slug === productSlug });
                    const cartImage = filterProduct[0].primaryImage;
                    const cartPrice = filterProduct[0].productPrice;
                    const cartSellPrice = filterProduct[0].productSpecialPrice;
                    const cartItemtotalPrice = parseInt(filterProduct[0].productPrice) * parseInt(cartCount);
                    const cartItemtotalSellPrice = parseInt(filterProduct[0].productSpecialPrice) * parseInt(cartCount)

                    return { id, userSlug, productId, cartCount, cartImage, cartPrice, cartSellPrice, cartItemtotalPrice, cartItemtotalSellPrice, filterProduct }

                });
                return filterCartItem;
            } else {
                return "Failed! Product is not exist"
            }
        } else {
            return "Failed! Cart is empty"
        }
    } catch (error) {
        return error;
    }
}

module.exports = { checkUserCart }
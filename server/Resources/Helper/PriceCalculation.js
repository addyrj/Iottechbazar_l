const getTotalSellPrice = async (checkCart, checkProduct) => {
    let priceArray = [];
    priceArray = await checkCart.map((currELem) => {
        const productSlug = currELem.productSlug;
        const cartCount = currELem.cartCount;
        const filterProduct = checkProduct.filter((item) => { return item.slug === productSlug });

        return parseInt(filterProduct[0].productSpecialPrice) * parseInt(cartCount)
    });

    if (priceArray.length !== 0) {
        const tPrice = await priceArray.reduce((a, b) => {
            return a + b;
        });
        return tPrice;
    } else {
        return 0;
    }
}

const getTotalBasePrice = async (checkCart, checkProduct) => {
    let basePrice = [];

    basePrice = await checkCart.map((currELem) => {
        const productSlug = currELem.productSlug;
        const cartCount = currELem.cartCount;
        const filterProduct = checkProduct.filter((item) => { return item.slug === productSlug });
        return parseInt(filterProduct[0].basePrice) * parseInt(cartCount)
    });


    if (basePrice.length !== 0) {
        const totalBasePrice = await basePrice.reduce((a, b) => {
            return a + b;
        })

        return totalBasePrice;
    } else {
        return 0;
    }
}

const getGstTax = async (checkCart, checkProduct) => {
    let basePrice = [];
    let priceArray = [];

    priceArray = await checkCart.map((currELem) => {
        const productSlug = currELem.productSlug;
        const cartCount = currELem.cartCount;
        const filterProduct = checkProduct.filter((item) => { return item.slug === productSlug });

        return parseInt(filterProduct[0].productSpecialPrice) * parseInt(cartCount)
    });

    basePrice = await checkCart.map((currELem) => {
        const productSlug = currELem.productSlug;
        const cartCount = currELem.cartCount;
        const filterProduct = checkProduct.filter((item) => { return item.slug === productSlug });
        return parseInt(filterProduct[0].basePrice) * parseInt(cartCount)
    });

    if (basePrice.length !== 0) {
        const totalBasePrice = await basePrice.reduce((a, b) => {
            return a + b;
        })

        const totalSellPrice = await priceArray.reduce((a, b) => {
            return a + b;
        })

        return totalSellPrice - totalBasePrice;
    } else {
        return 0;
    }
}

module.exports = { getTotalSellPrice, getTotalBasePrice, getGstTax }
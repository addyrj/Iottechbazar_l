const generateOrder = async (req, res, next) => {
    try {
        const { amount, paymentMode } = req.body;
        const user = req.user;
        if (isEmpty(amount)) {
            res.status(300).send({
                status: 300,
                message: "Failed! Amount is not found"
            })
        } else if (!user) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            let instance = new Razorpay({
                key_id: process.env.RAZOR_PAY_KEY_ID,
                key_secret: process.env.RAZOR_PAY_KEY_SECRET,
            });

            const checkAddress = await Address.findOne({ where: { userId: user.userId, defautAddress: "true" } });
            if (checkAddress) {
                const checkCart = await Cart.findAll({ where: { userSlug: user.slug } });
                if (checkCart.length !== 0) {
                    const orderCount = await Order.findAll();
                    const settingInfo = await Setting.findAll();

                    const getTotalSellPrice = () => {
                        let priceArray = [];
                        priceArray = checkCart.map((currELem) => {
                            return currELem.cartItemtotalSellPrice
                        });

                        if (priceArray.length !== 0) {
                            const tPrice = priceArray.reduce((a, b) => {
                                return a + b;
                            });
                            return tPrice;
                        } else {
                            return 0;
                        }
                    }

                    const getTotalBasePrice = () => {
                        let basePrice = [];

                        basePrice = checkCart.map((currELem) => {
                            return currELem.basePrice
                        });

                        if (basePrice.length !== 0) {
                            const totalBasePrice = basePrice.reduce((a, b) => {
                                return a + b;
                            })

                            return totalBasePrice;
                        } else {
                            return 0;
                        }
                    }

                    const getGstTax = () => {
                        let basePrice = [];
                        let priceArray = [];

                        priceArray = checkCart.map((currELem) => {
                            return currELem.cartItemtotalSellPrice
                        });

                        basePrice = checkCart.map((currELem) => {
                            return currELem.basePrice
                        });

                        if (basePrice.length !== 0) {
                            const totalBasePrice = basePrice.reduce((a, b) => {
                                return a + b;
                            })

                            const totalSellPrice = priceArray.reduce((a, b) => {
                                return a + b;
                            })

                            return totalSellPrice - totalBasePrice;
                        } else {
                            return 0;
                        }
                    }

                    const totalBasePrice = await getTotalBasePrice();
                    const totalTaxes = await getGstTax();

                    console.log(totalTaxes)
                    const totalAmount = await getTotalSellPrice();

                    const option = {
                        amount: parseInt(amount) * 100,
                        currency: "INR",
                        receipt: `recipt#${orderCount.length + 1}`,
                        payment_capture: 1,
                        partial_payment: false,
                        notes: {
                            key_id: process.env.RAZOR_PAY_KEY_ID,
                            key_secret: process.env.RAZOR_PAY_KEY_SECRET,
                            name: settingInfo.length !== 0 ? settingInfo[0].app_name : "",
                            description: "Online Transaction from IoTtech Smart Product",
                            image: settingInfo.length !== 0 ? settingInfo[0].app_logo : "",
                            address: settingInfo.length !== 0 ? settingInfo[0].app_address : "",
                            themeColor: "#a6c76c",
                            userName: checkAddress.name,
                            userEmail: checkAddress.email,
                            userContact: checkAddress.contact
                        }
                    }

                    const generateNewOrder = await instance.orders.create(option);
                    if (generateNewOrder) {
                        const info = {
                            orderNumber: generateNewOrder.id,
                            userSlug: user.slug,
                            name: checkAddress.name,
                            contact: checkAddress.contact,
                            email: checkAddress.email,
                            address1: checkAddress.address1,
                            address2: checkAddress.address2,
                            pincode: checkAddress.pincode,
                            city: checkAddress.city,
                            state: checkAddress.state,
                            country: checkAddress.country,
                            transactionId: "",
                            paymentMode: paymentMode,
                            totalProduct: checkCart.length,
                            shipping: "200",
                            allTaxes: totalTaxes,
                            totalBasePrice: totalBasePrice,
                            totalAmount: totalAmount,
                            totalDueAmount: totalAmount,
                            status: "Pending"
                        }

                        const createOrder = await Order.create(info);
                        if (createOrder) {
                            const productList = await Product.findAll();
                            const createOrderDetail = checkCart?.map((item, index) => {
                                const checkProduct = productList.filter((currElem) => { return currElem.id === item.productId })
                                if (checkProduct.length !== 0) {
                                    const info = {
                                        orderNumber: generateNewOrder.id,
                                        productId: checkProduct[0]?.id,
                                        productName: checkProduct[0]?.name,
                                        price: checkProduct[0]?.productPrice,
                                        specialPrice: checkProduct[0]?.productSpecialPrice,
                                        productCount: item.cartCount,
                                        productTotalPrice: parseInt(item.cartCount) * parseInt(checkProduct.productSpecialPrice)
                                    }
                                    return OrderDetail.create(info);
                                } else {
                                    res.status(400).json({
                                        status: 400,
                                        message: "No Product Found"
                                    })
                                }
                            });

                            await Promise.all(createOrderDetail).then((result) => {
                                res.status(200).json({
                                    status: 200,
                                    message: "Order Created Successfully",
                                    info: generateNewOrder
                                })
                            }).catch((error) => {
                                res.status(300).json({
                                    status: 300,
                                    message: "Faild!Order is not created",
                                    info: error
                                })
                            })
                        } else {
                            res.status(300).send({
                                status: 300,
                                message: "Failed! Order not created"
                            })
                        }

                    } else {
                        return res.status(300).send({
                            status: 300,
                            message: "Failed! Order unsuccessfull",
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "Failed! Product not found, Please add item to cart to purchae"
                    })
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Address is not found"
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
const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");
const jwt = require("jsonwebtoken");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { checkRoutePermission } = require("../Function/RouteAuth");
const { generateProductSlug } = require("../Helper/GenerateToken");

const Product = db.product;
const Category = db.category;
const SubCategory = db.subCategory;
const ProductTitle = db.productTitile;
const ProductReview = db.productReview;
const User = db.user;

const addProduct = async (req, res, next) => {
    try {
        // metaTag
        const admin = req.admin;
        const { productName, subScript, hsnCode, productSku, model, colorVarinat, category, subCategory,
            attribute, attributeFamily, productPrice, specialPrice, gst, gstRate, discountType, discount, basePrice, stock,
            metaTag, flipLink, amazonLink, meeshoLink, productDesc, productSpec, productOffer, productManufacturer,
            url, warranty, trending, onsale, commingsoon, schoolproject, special } = req.body;

        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const slug = await generateProductSlug(productName);

                let warrantyState;
                isEmpty(warranty) ? warrantyState = false : warrantyState = true

                let info = {
                    slug: slug,
                    name: productName,
                    subScript: subScript,
                    hsnCode: hsnCode,
                    productSku: productSku,
                    model: model,
                    colorVariantSlug: colorVarinat,
                    categorySlug: category,
                    subCategorySlug: subCategory,
                    attributeSlug: attribute,
                    attributeFamilySlug: attributeFamily,
                    productPrice: productPrice,
                    productSpecialPrice: specialPrice,
                    gst: gst,
                    gstRate: gstRate,
                    discountType: discountType,
                    discount: discount,
                    basePrice: basePrice,
                    stock: stock,
                    metaTag: metaTag,
                    primaryImage: req.file !== undefined ? req.file.filename : null,
                    flipkartLink: flipLink,
                    amazonLink: amazonLink,
                    meeshoLink: meeshoLink,
                    description: productDesc,
                    specification: productSpec,
                    offer: productOffer,
                    manufacturer: productManufacturer,
                    warrantyState: warrantyState,
                    warranty: warranty,
                    status: "true",
                    createdBy: admin.role,
                    trending: trending,
                    onsale: onsale,
                    commingsoon: commingsoon,
                    schoolproject: schoolproject,
                    special: special
                }

                await Product.create(info)
                    .then((response) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Product Create Successfull",
                            info: response
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Product not Created",
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

const addSecondaryImages = async (req, res, next) => {
    try {
        const slug = req.body.slug;
        if (isEmpty(slug)) {
            return res.status(300).json({ message: "Failed! Product slug is not found" })
        } else {
            let banner = req.files.map((currElem) => {
                return currElem.filename;
            })

            const info = {
                secondaryImage: banner
            }

            await Product.update(info, { where: { slug: slug } })
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Product banner images add successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Banner upload failed",
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
    next();
}

const getProduct = async (req, res, next) => {
    try {
        const getAllProduct = await Product.findAll();
        const getAllCategory = await Category.findAll();
        const getAllSubCategory = await SubCategory.findAll();
        const checkProductReview = await ProductReview.findAll();


        if (getAllProduct.length !== 0) {
            const filterProduct = getAllProduct.map((currElem) => {
                const id = currElem.id;
                const slug = currElem.slug;
                const name = currElem.name;
                const subScript = currElem.subScript;
                const hiName = currElem.hiName;
                const hsnCode = currElem.hsnCode;
                const productSku = currElem.productSku;
                const model = currElem.model;
                const productPrice = currElem.productPrice;
                const productSpecialPrice = currElem.productSpecialPrice;
                const discountType = currElem.discountType;
                const discount = currElem.discount;
                const basePrice = currElem.basePrice;
                const stock = currElem.stock;
                const primaryImage = currElem.primaryImage;
                const status = currElem.status;
                const createdBy = currElem.createdBy
                const categorySlug = currElem.categorySlug;
                const category = getAllCategory.filter((item) => { return item.slug === currElem.categorySlug });
                const categoryName = category.length !== 0 ? category[0].name : undefined;
                const subCategorySlug = currElem.subCategorySlug;
                const subCategory = getAllSubCategory.filter((item) => { return item.slug === currElem.subCategorySlug });
                const subCategoryName = subCategory.length !== 0 ? subCategory[0].name : undefined;
                const description = currElem.description;
                const offer = currElem.offer;
                const mulLanguageSubscript = currElem.mulLanguageSubscript;
                const secondaryImage = JSON.parse(currElem.secondaryImage);
                const multiLanguageDesc = currElem.multiLanguageDesc;
                const multiLanguageSpec = currElem.multiLanguageSpec;
                const specification = currElem.specification;
                const multiLanguageOffer = currElem.multiLanguageOffer;
                const manufacturer = currElem.manufacturer;
                const warrantyState = currElem.warrantyState;
                const warranty = currElem.warranty;
                const multiLanguageWarranty = currElem.multiLanguageWarranty;
                const trending = currElem.trending;
                const onsale = currElem.onsale;
                const commingsoon = currElem.commingsoon;
                const schoolproject = currElem.schoolproject;
                const special = currElem.special;
                const filterProductReview = checkProductReview.filter((item) => { return item.productId == id });
                const oneStar = filterProductReview.filter((currElem) => {
                    return currElem.rating === "1"
                });
                const twoStar = filterProductReview.filter((currElem) => {
                    return currElem.rating === "2"
                });
                const threeStar = filterProductReview.filter((currElem) => {
                    return currElem.rating === "3"
                });
                const fourStar = filterProductReview.filter((currElem) => {
                    return currElem.rating === "4"
                });
                const fiveStar = filterProductReview.filter((currElem) => {
                    return currElem.rating === "5"
                });

                const rating = (1 * oneStar.length + 2 * twoStar.length + 3 * threeStar.length
                    + 4 * fourStar.length + 5 * fiveStar.length) /
                    (oneStar.length + twoStar.length + threeStar.length + fourStar.length
                        + fiveStar.length);
                const review = filterProductReview.length

                return {
                    id, slug, name, hiName, hsnCode, productSku, model, productPrice, productSpecialPrice, discountType, description, offer,
                    discount, basePrice, stock, primaryImage, status, categorySlug, categoryName, subCategorySlug,
                    subCategoryName, createdBy, subScript, mulLanguageSubscript, secondaryImage, multiLanguageDesc, multiLanguageSpec,
                    specification, multiLanguageOffer, manufacturer, warrantyState, warranty, multiLanguageWarranty,
                    trending, onsale, commingsoon, schoolproject, special, rating, review
                }

            });

            res.status(200).json({
                status: 200,
                message: "All Product list fetch successfully",
                info: filterProduct
            })

        } else {
            res.status(400).send({
                status: 400,
                message: "Failed! Product not found"
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

const getProductSection = async (req, res, next) => {
    let trending = [];
    let onSale = [];
    let commingSoon = [];
    let schholProject = [];
    let specials = [];
    try {
        // trending, onsale, commingsoon, schoolproject, special
        const productList = await Product.findAll();
        if (productList.length !== 0) {
            trending = productList.filter((item) => {
                return item.trending === "true"
            });

            onSale = await productList.filter((item) => {
                return item.onsale === "true"
            });

            commingSoon = await productList.filter((item) => {
                return item.commingsoon === "true"
            });

            schholProject = await productList.filter((item) => {
                return item.schoolproject === "true"
            });

            specials = await productList.filter((item) => {
                return item.special === "true"
            });

            return res.status(200).json({
                status: 200,
                message: "Product categories data fetch successfully",
                info: {
                    trending, onSale, commingSoon, schholProject, specials
                }
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Product is epmty"
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

const getProductDetail = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const updateProduct = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const deleteProduct = async (req, res, next) => {
  try {

    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({
        status: 400,
        error: true,
        message: "Product slug is required"
      });
    }


    const product = await Product.findOne({ where: { slug: slug } });
    
    if (!product) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: "Product not found"
      });
    }
    await Product.destroy({ where: { slug: slug } });
    
    console.log(`Product with slug ${slug} deleted successfully`);
    
    // Return success response
    return res.status(200).json({
      status: 200,
      error: false,
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      status: 500,
      error: true,
      message: error.message || "Internal server error"
    });
  }
};

const changeProductStatus = async (req, res, next) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        })
    }
    next();
}

const createProductInfoMultiLanguage = async (req, res, next) => {
    try {
        const admin = req.admin;
        const { slug, mulLanguageName, mulLanguageSubscript, multiLanguageDesc,
            multiLanguageSpec, multiLanguageOffer } = req.body;

        if (isEmpty(slug)) {
            return res.status(300).send({
                status: 300,
                message: "Failed! Product Slug is not found"
            })
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkProduct = await Product.findOne({ where: { slug: slug } });
            if (checkProduct) {
                if (checkProduct.createdBy === admin.role || checkProduct.createdBy === "Admin") {
                    if (isEmpty(checkProduct.mulLanguageName) || checkProduct.mulLanguageName === null ||
                        isEmpty(checkProduct.mulLanguageSubscript) || checkProduct.mulLanguageSubscript === null ||
                        isEmpty(checkProduct.multiLanguageDesc) || checkProduct.multiLanguageDesc === null ||
                        isEmpty(checkProduct.multiLanguageSpec) || checkProduct.multiLanguageSpec === null ||
                        isEmpty(checkProduct.multiLanguageOffer) || checkProduct.multiLanguageOffer === null
                    ) {

                        const info = {
                            mulLanguageName: mulLanguageName,
                            mulLanguageSubscript: mulLanguageSubscript,
                            multiLanguageDesc: multiLanguageDesc,
                            multiLanguageSpec: multiLanguageSpec,
                            multiLanguageOffer: multiLanguageOffer
                        }
                        await Product.update(info, { where: { slug: slug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Product multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Product multiple language text not updated",
                                    info: error
                                })
                            })
                    } else {
                        const nameArray = JSON.parse(JSON.parse(checkProduct.mulLanguageName)).concat(JSON.parse(mulLanguageName));
                        const subScriptArray = JSON.parse(JSON.parse(checkProduct.mulLanguageSubscript)).concat(JSON.parse(mulLanguageSubscript));
                        const descArray = JSON.parse(JSON.parse(checkProduct.multiLanguageDesc)).concat(JSON.parse(multiLanguageDesc));
                        const specArray = JSON.parse(JSON.parse(checkProduct.multiLanguageSpec)).concat(JSON.parse(multiLanguageSpec));
                        const offerArray = JSON.parse(JSON.parse(checkProduct.multiLanguageOffer)).concat(JSON.parse(multiLanguageOffer));

                        const info = {
                            mulLanguageName: JSON.stringify(nameArray),
                            mulLanguageSubscript: JSON.stringify(subScriptArray),
                            multiLanguageDesc: JSON.stringify(descArray),
                            multiLanguageSpec: JSON.stringify(specArray),
                            multiLanguageOffer: JSON.stringify(offerArray)
                        }

                        await Product.update(info, { where: { slug: slug } })
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "Product multiple language update Successfull",
                                    info: result
                                })
                            })
                            .catch((error) => {
                                return res.status(300).send({
                                    status: 300,
                                    message: "Failed! Product multiple language text not updated",
                                    info: error
                                })
                            })
                    }
                } else {
                    return res.status(300).json({
                        status: 300,
                        message: "You have not authorized to update this category"
                    })
                }
            } else {
                return res.status(400).send({
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

const addProductTitle = async (req, res, next) => {
    try {
        const { titile, hiTitle, url } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const admin = req.admin;

        if (errorResponse.length !== 0) {
            return res.status(300).send({
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
                const slug = await generateProductSlug(titile)
                const info = {
                    name: titile,
                    slug: slug,
                    hiName: hiTitle,
                    createdBy: admin.role,
                    status: "true"
                }

                await ProductTitle.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Product Title Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Product Titile not Created",
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

const getProductTitle = async (req, res, next) => {
    try {
        const checkProductTitles = await ProductTitle.findAll();
        if (checkProductTitles.length !== 0) {
            res.status(200).send({
                status: 200,
                message: "Product Titile data fetch successfully",
                info: checkProductTitles
            })
        } else {
            res.status(400).send({
                status: 400,
                message: "Product Titile not found",
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
const deleteProductTitle = async (req, res, next) => {
    try {
        const { id, url } = req.body;  // take id of product title you want to delete
        const admin = req.admin;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Product Title ID is required"
            });
        }

        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            });
        }

        const checkPermission = await checkRoutePermission(admin, url);
        if (checkPermission === true) {
            const productTitle = await ProductTitle.findByPk(id);

            if (!productTitle) {
                return res.status(404).json({
                    status: 404,
                    message: "Product Title not found"
                });
            }

            await ProductTitle.destroy({ where: { id } });

            return res.status(200).json({
                status: 200,
                message: "Product Title deleted successfully"
            });
        } else {
            return res.status(300).send({
                status: 300,
                message: "Authorization Failed!"
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
    next();
};
const editProductTitle = async (req, res, next) => {
    try {
        const { id, titile, hiTitle, url } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const admin = req.admin;

        if (errorResponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorResponse
            });
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            });
        } else {
            const checkPermission = await checkRoutePermission(admin, url);
            if (checkPermission === true) {
                const product = await ProductTitle.findOne({ where: { id } });

                if (!product) {
                    return res.status(400).send({
                        status: 400,
                        message: "Product Title not found"
                    });
                }

                const slug = await generateProductSlug(titile);

                product.name = titile;
                product.hiName = hiTitle;
                product.slug = slug;

                await product.save();

                return res.status(200).send({
                    status: 200,
                    message: "Product Title updated successfully",
                    info: product
                });
            } else {
                return res.status(300).send({
                    status: 300,
                    message: "Authorization Failed!"
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
    next();
};



const addProductReview = async (req, res, next) => {
    try {
        const { productId, productSlug, rating, review } = req.body;
        const user = req.user;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!user) {
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
            const checkProduct = await Product.findOne({ where: { id: productId, slug: productSlug } });

            if (checkProduct) {
                const info = {
                    userId: user.userId,
                    userSlug: user.slug,
                    productId: checkProduct.id,
                    productSlug: checkProduct.slug,
                    rating: rating,
                    review: review,
                    status: "true"
                }

                await ProductReview.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Product Review Create Successfull",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Product Review not Created",
                            info: error
                        })
                    })
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

const getProductReview = async (req, res, next) => {
    try {
        const { productId, productSlug } = req.body;
        const errorNullRsponse = await ErrorNullResponse(req.body);
        if (errorNullRsponse.length !== 0) {
            return res.status(300).send({
                status: 300,
                message: errorNullRsponse
            })
        } else {
            const checkProductReview = await ProductReview.findAll({ where: { productId: productId, productSlug: productSlug } });
            const productList = await Product.findAll();
            const userList = await User.findAll({ attributes: { exclude: ['password'] } });

            if (checkProductReview.length !== 0) {
                const oneStar = checkProductReview.filter((currElem) => {
                    return currElem.rating === "1"
                });
                const twoStar = checkProductReview.filter((currElem) => {
                    return currElem.rating === "2"
                });
                const threeStar = checkProductReview.filter((currElem) => {
                    return currElem.rating === "3"
                });
                const fourStar = checkProductReview.filter((currElem) => {
                    return currElem.rating === "4"
                });
                const fiveStar = checkProductReview.filter((currElem) => {
                    return currElem.rating === "5"
                });

                const ar = (1 * oneStar.length + 2 * twoStar.length + 3 * threeStar.length
                    + 4 * fourStar.length + 5 * fiveStar.length) /
                    (oneStar.length + twoStar.length + threeStar.length + fourStar.length
                        + fiveStar.length)

                const filterReview = checkProductReview?.map((item, index) => {
                    const id = item.id;
                    const slug = item.slug;
                    const userId = item.userId;
                    const productId = item.productId;
                    const checkUser = userList.filter((currElem) => { return currElem.userId == userId });
                    const customerName = checkUser[0].name;
                    const customerEmail = checkUser[0].email;
                    const customerContact = checkUser[0].contact;
                    const checkProduct = productList.filter((currElem) => { return currElem.id == productId })
                    const productName = checkProduct[0].name;
                    const productImage = checkProduct[0].primaryImage;
                    const rating = item.rating;
                    const review = item.review;
                    const status = item.status;
                    const createdAt = item.createdAt;

                    return { id, slug, userId, productId, customerName, customerEmail, customerContact, productName, productImage, rating, review, createdAt, status }
                });

                return res.status(200).json({
                    status: 200,
                    message: "Product review data fetch successfully",
                    info: filterReview,
                    avgRating: ar
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Product Review not found"
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

const getProductAdminReview = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkProductReview = await ProductReview.findAll();
            const productList = await Product.findAll();
            const userList = await User.findAll({ attributes: { exclude: ['password'] } });
            console.log(userList)
            if (checkProductReview.length !== 0) {
                const filterReview = checkProductReview?.map((item, index) => {
                    const id = item.id;
                    const slug = item.slug;
                    const userId = item.userId;
                    const productId = item.productId;
                    const checkUser = userList.filter((currElem) => { return currElem.userId == userId });
                    const customerName = checkUser[0].name;
                    const customerEmail = checkUser[0].email;
                    const customerContact = checkUser[0].contact;
                    const checkProduct = productList.filter((currElem) => { return currElem.id == productId })
                    const productName = checkProduct[0].name;
                    const productImage = checkProduct[0].primaryImage;
                    const rating = item.rating;
                    const review = item.review;
                    const status = item.status;
                    const createdAt = item.createdAt;

                    return { id, slug, userId, productId, customerName, customerEmail, customerContact, productName, productImage, rating, review, status, createdAt }
                });

                return res.status(200).json({
                    status: 200,
                    message: "Product review data fetch successfully",
                    info: filterReview
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Product Review not found"
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

const updateProductReview = async (req, res, next) => {
    try {
        const { id, rating, review, status } = req.body;
        const errorNullRespose = await ErrorNullResponse(req.body);
        const admin = req.admin;
        if (errorNullRespose.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorNullRespose
            })
        } else if (!admin) {
            return res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            if (admin.role === "Admin") {
                const checkProductReview = await ProductReview.findOne({ where: { id: id } });
                if (checkProductReview) {
                    const info = {
                        rating: rating,
                        review: review,
                        status: status
                    }
                    await ProductReview.update(info, { where: { id: id } })
                        .then((result) => {
                            return res.status(200).json({
                                status: 200,
                                message: "Product Review Update Successfull",
                                info: result
                            })
                        })
                        .catch((error) => {
                            return res.status(300).json({
                                status: 300,
                                message: "Failed! Product Review not Update",
                                info: error
                            })
                        })
                } else {
                    return res.status(400).send({
                        status: 400,
                        message: "Failed! Product review not found"
                    })
                }
            } else {
                return res.status(300).json({
                    status: 300,
                    message: "You have not authorized to update this category"
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


module.exports = { addProduct, addSecondaryImages, getProduct, getProductDetail, updateProduct, deleteProduct, changeProductStatus, addProductTitle, getProductTitle, createProductInfoMultiLanguage, getProductSection, addProductReview, getProductReview, getProductAdminReview, updateProductReview ,deleteProductTitle,editProductTitle}
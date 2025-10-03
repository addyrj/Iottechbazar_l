const db = require("../../DB/config");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");

const Setting = db.setting;
const Country = db.country;
const State = db.state;

const createApplicationInfo = async (req, res, next) => {
    try {
        const { name, email, contact, address, pincode, city, state, country } = req.body;

        const errorResponse = await ErrorNullResponse(req.body);
        if (errorResponse.length !== 0) {
            res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const logo = req.files?.filter((item) => {
                return item.originalname === "logo.png"
            });

            const favicon = req.files?.filter((item) => {
                return item.originalname === "favicon.png"
            });

            const info = {
                app_name: name,
                app_email: email,
                app_contact: contact,
                app_logo: logo[0].filename,
                app_favicon: favicon[0].filename,
                app_country: country,
                app_state: state,
                app_city: city,
                app_pin_code: pincode,
                app_address: address
            }

            await Setting.create(info)
                .then((result) => {
                    return res.status(200).json({
                        status: 200,
                        message: "Application information created successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    return res.status(300).json({
                        status: 300,
                        message: "Failed! Application information not created",
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

const getApplicationInfo = async (req, res) => {
    try {
        const appInfo = await Setting.findAll();
        if (appInfo.length !== 0) {
            const checkCountry = await Country.findOne({ where: { id: appInfo[0].app_country } });
            const checkState = await State.findOne({ where: { id: appInfo[0].app_state } });
            return res.status(200).json({
                status: 200,
                message: "Application info data fetch successfully",
                info: {
                    app_name: appInfo[0].app_name,
                    app_email: appInfo[0].app_email,
                    app_contact: appInfo[0].app_contact,
                    app_address: appInfo[0].app_address,
                    app_pin_code: appInfo[0].app_pin_code,
                    app_city: appInfo[0].app_city,
                    app_country: checkCountry.name,
                    countryId: appInfo[0].app_country,
                    appState: checkState.name,
                    stateId: appInfo[0].app_state,
                    app_logo: appInfo[0].app_logo,
                    app_favicon: appInfo[0].app_favicon,
                    shipping_fee: appInfo[0].shipping_fee,
                    shipping_free_limit: appInfo[0].shipping_free_limit
                }
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! App info is not found"
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

const addShipping = async (req, res, next) => {
    try {
        const { shipiingFreeLimit, shippingFee } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else if (errorResponse.length !== 0) {
            res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkShiiping = await Setting.findAll();
            if (checkShiiping.length !== 0) {
                await Setting.update({ shipping_fee: shippingFee, shipping_free_limit: shipiingFreeLimit }, { where: { id: checkShiiping[0].id } })
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            message: "Shiiping Update Successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).json({
                            status: 300,
                            message: "Failed! Shipping info is not updated",
                            info: error
                        })
                    })
            } else {
                await Setting.create({ shipping_fee: shippingFee, shipping_free_limit: shipiingFreeLimit })
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            message: "Shiiping Created Successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).json({
                            status: 300,
                            message: "Failed! Shipping info is not Created",
                            info: error
                        })
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

const getShipping = async (req, res, next) => {
    try {
        const checkShipping = await Setting.findAll();
        if (checkShipping.length !== 0) {
            const info = {
                shippingFee: checkShipping[0].shipping_fee,
                shippingFreeLimit: checkShipping[0].shipping_free_limit
            }

            res.status(200).json({
                status: 200,
                message: "Shiiping info daa fetch successfully",
                info: info
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Shipping info is not found"
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

const addAdminTheme = async (req, res, next) => {
    try {
        const { sidebarColor, headerColor, fontFamily, textColor, themeColor } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else if (errorResponse.length !== 0) {
            res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkSetting = await Setting.findAll();
            if (checkSetting.length !== 0) {
                const info = {
                    admin_sidebar_color: sidebarColor,
                    admin_header_color: headerColor,
                    admin_font_color: textColor,
                    admin_font_family: fontFamily,
                    admin_theme_color: themeColor
                }
                await Setting.update(info, { where: { id: checkSetting[0].id } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Admin Theme update successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Admin Theme not updated",
                            info: error
                        })
                    })
            } else {
                const info = {
                    admin_sidebar_color: sidebarColor,
                    admin_header_color: headerColor,
                    admin_font_color: textColor,
                    admin_font_family: fontFamily,
                    admin_theme_color: themeColor
                }
                await Setting.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Admin Theme Created Successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Admin Theme is not Created",
                            info: error
                        })
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

const getAdminTheme = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkSetting = await Setting.findAll();
            if (checkSetting.length !== 0) {
                const info = {
                    sidebarColor: checkSetting[0].admin_sidebar_color,
                    headerColor: checkSetting[0].admin_header_color,
                    textColor: checkSetting[0].admin_font_color,
                    fontFamily: checkSetting[0].admin_font_family,
                    themeColor: checkSetting[0].admin_theme_color
                }
                return res.status(200).json({
                    status: 200,
                    message: "Admin Theme fetch successfully",
                    info: info
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Admin Theme is not found",
                    info: error
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

const createWebsiteTheme = async (req, res, next) => {
    try {
        const { themeColor, headerColor, footerColor, footerTitleFontColor, footerFontColor, mobSideBarColor, mobSideBarTextColor } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            res.status(300).send({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else if (errorResponse.length !== 0) {
            res.status(300).send({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkSetting = await Setting.findAll();
            if (checkSetting.length !== 0) {
                const info = {
                    website_theme_color: themeColor,
                    website_header_color: headerColor,
                    website_mob_sidebar_color: mobSideBarColor,
                    website_mob_sidebar_text_color: mobSideBarTextColor,
                    website_footer_color: footerColor,
                    website_footer_title_font_color: footerTitleFontColor,
                    website_footer_font_color: footerFontColor
                }
                await Setting.update(info, { where: { id: checkSetting[0].id } })
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Website Theme update successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Website Theme not updated",
                            info: error
                        })
                    })
            } else {
                const info = {
                    website_theme_color: themeColor,
                    website_header_color: headerColor,
                    website_mob_sidebar_color: mobSideBarColor,
                    website_mob_sidebar_text_color: mobSideBarTextColor,
                    website_footer_color: footerColor,
                    website_footer_title_font_color: footerTitleFontColor,
                    website_footer_font_color: footerFontColor
                }
                await Setting.create(info)
                    .then((result) => {
                        return res.status(200).json({
                            status: 200,
                            message: "Website Theme Created Successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        return res.status(300).json({
                            status: 300,
                            message: "Failed! Website Theme is not Created",
                            info: error
                        })
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

const getWebsiteTheme = async (req, res, next) => {
    try {
        const checkSetting = await Setting.findAll();
        if (checkSetting.length !== 0) {
            const info = {
                themeColor: checkSetting[0].website_theme_color,
                headerColor: checkSetting[0].website_header_color,
                mobSideBarColor: checkSetting[0].website_mob_sidebar_color,
                mobSideBarTextColor: checkSetting[0].website_mob_sidebar_text_color,
                footerColor: checkSetting[0].website_footer_color,
                footerTitleFontColor: checkSetting[0].website_footer_title_font_color,
                footerFontColor: checkSetting[0].website_footer_font_color
            }
            return res.status(200).json({
                status: 200,
                message: "Website Theme fetch successfully",
                info: info
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Website Theme is not found",
                info: error
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


module.exports = { createApplicationInfo, getApplicationInfo, addShipping, getShipping, addAdminTheme, getAdminTheme, createWebsiteTheme, getWebsiteTheme }
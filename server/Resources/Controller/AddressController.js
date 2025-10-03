const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");
const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");

const Address = db.address;

const addAddress = async (req, res, next) => {
    try {
        const { fName, lName, email, contact, optional_contact, address1, address2, pincode, city, state, country, defaultAddress, addressType } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const user = req.user;
        if (!user) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized user"
            })
        } else {
            const slug = await generateProductSlug(fName + lName + user.userId.toString());
            const info = {
                slug: slug,
                userId: user.userId,
                name: fName + " " + lName,
                email: email,
                contact: contact,
                optional_contact: optional_contact,
                address1: address1,
                address2: address2,
                pincode: pincode,
                city: city,
                state: state,
                country: country,
                addressType: addressType,
                defaultAddress: defaultAddress,
                status: "true",
                otp: null,
                otp_status: "false"
            }
            await Address.create(info)
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        message: "Address created successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Address not be created",
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

const getAddress = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(300).json({
                status: 300,
                message: "Failed! User session expired"
            })
        } else {
            const addressList = await Address.findAll({ where: { userId: user.userId } });
            if (addressList.length !== 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Address data fetch successfull",
                    info: addressList
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! There are no address exist"
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

const removeAddress = async (req, res, next) => {
    try {
        const user = req.user;
        const addressId = req.body.addressId;

        if (!user) {
            return res.status(300).json({
                status: 300,
                message: "Failed! User session expired"
            })
        } else if (isEmpty(addressId.toString())) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select a valid address"
            })
        } else {
            const checkAddress = await Address.findOne({ where: { id: addressId } });
            if (checkAddress) {
                await Address.destroy({ where: { id: addressId } })
                    .then((result) => {
                        res.status(200).send({
                            status: 200,
                            message: "Address delete successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).send({
                            status: 300,
                            message: "Failed! Address not be deleted",
                            info: error
                        })
                    })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Address is not exist"
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

const updateAddress = async (req, res, next) => {
    try {
        const { addressId, name, email, contact, optional_contact, address1, address2, pincode, city, state, counry, defaultAddress, addressType } = req.body;
        const errorResponse = await ErrorNullResponse(req.body);
        const user = req.user;
        if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else if (!user) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized user"
            })
        } else {
            const checkAddress = await Address.findOne({ ehere: { id: addressId } });
            if (checkAddress) {
                const info = {
                    name: name,
                    email: email,
                    contact: contact,
                    optional_contact: optional_contact,
                    address1: address1,
                    address2: address2,
                    pincode: pincode,
                    city: city,
                    state: state,
                    counry: counry,
                    addressType: addressType,
                    defaultAddress: defaultAddress
                }

                await Address.update(info, { where: { id: addressId } })
                    .then((result) => {
                        res.status(200).send({
                            status: 200,
                            message: "Address update successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).send({
                            status: 300,
                            message: "Failed! Address not be updated",
                            info: error
                        })
                    })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Failed! Address is not exist"
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

module.exports = { addAddress, getAddress, removeAddress, updateAddress }
const ErrorNullResponse = require("../Helper/ErrorNullResponse");
const { generateProductSlug } = require("../Helper/GenerateToken");
const db = require("../../DB/config");
const isEmpty = require("lodash.isempty");

const Address = db.address;

const addAddress = async (req, res, next) => {
    try {
        const { fName, lName, email, contact, optional_contact, address1, address2, pincode, city, state, country, defaultAddress, addressType } = req.body;
        const user = req.user;
        
        console.log("Received address data:", req.body); // Debug log
        
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Failed! You are not authorized"
            });
        }

        // Basic validation
        if (!fName || !lName || !contact || !address1 || !pincode || !city || !state) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Required fields are missing"
            });
        }

        // Generate unique slug
        const slug = await generateProductSlug(fName + lName + user.userId.toString() + Date.now());
        
        const info = {
            slug: slug,
            userId: user.userId,
            name: `${fName} ${lName}`.trim(),
            email: email || null,
            contact: contact,
            optional_contact: optional_contact || null,
            address1: address1,
            address2: address2 || null,
            pincode: pincode,
            city: city,
            state: state,
            country: country || "India", // Default country
            addressType: addressType || 0, // Default to Home
            defaultAddress: defaultAddress || "false",
            status: "true",
            otp: null,
            otp_status: "false"
        }
        
        console.log("Creating address with info:", info);

        const result = await Address.create(info);
        
        res.status(200).json({
            status: 200,
            message: "Address created successfully",
            info: result
        });
        
    } catch (error) {
        console.error("Server error:", error);
        
        // Handle specific Sequelize errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                status: 400,
                message: "Email already exists for another address",
                info: error.message
            });
        }
        
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            
            return res.status(400).json({
                status: 400,
                message: "Validation failed",
                errors: validationErrors
            });
        }
        
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
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
        const { addressId, name, email, contact, optional_contact, address1, address2, pincode, city, state, country, defaultAddress, addressType } = req.body; // Fixed typo: counry -> country
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Failed! You are not authorized"
            });
        }

        if (!addressId) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Address ID is required"
            });
        }

        // Fix the typo in the where clause
        const checkAddress = await Address.findOne({ where: { id: addressId } }); // Fixed: ehere -> where
        
        if (!checkAddress) {
            return res.status(404).json({
                status: 404,
                message: "Failed! Address not found"
            });
        }

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
            country: country, // Fixed typo
            addressType: addressType,
            defaultAddress: defaultAddress
        }

        // Remove null/undefined fields
        Object.keys(info).forEach(key => {
            if (info[key] === undefined || info[key] === null) {
                delete info[key];
            }
        });

        await Address.update(info, { where: { id: addressId } });
        
        // Get updated address
        const updatedAddress = await Address.findOne({ where: { id: addressId } });
        
        res.status(200).json({
            status: 200,
            message: "Address updated successfully",
            info: updatedAddress
        });
        
    } catch (error) {
        console.error("Update address error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = { addAddress, getAddress, removeAddress, updateAddress }
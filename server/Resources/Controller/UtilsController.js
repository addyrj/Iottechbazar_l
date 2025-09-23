const db = require("../../DB/config");
const { checkRoutePermission } = require("../Function/RouteAuth");
const ErrorNullResponse = require("../Helper/ErrorNullResponse");

const State = db.state;
const Country = db.country;
const City = db.city;
const Pincode = db.pincode;

const getState = async (req, res, next) => {
    try {
        const stateList = await State.findAll();
        if (stateList.length !== 0) {
            res.status(200).send({
                status: 200,
                message: "State data fetch successfully",
                info: stateList
            })
        } else {
            return res.status(400).send({
                status: 400,
                message: "Failed! State list is not exist"
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

const getCountry = async (req, res, next) => {
    try {
        const countryList = await Country.findAll();
        if (countryList.length !== 0) {
            res.status(200).send({
                status: 200,
                message: "Country data fetch successfully",
                info: countryList
            })
        } else {
            return res.status(400).send({
                status: 400,
                message: "Failed! County list is not exist"
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

const checkSession = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            return res.status(200).json({
                status: 200,
                message: "Session has valid",
                info: {
                    userId: user.userId,
                    slug: user.slug
                }
            })
        } else {
            return res.status(300).json({
                status: 300,
                message: "Failed! Session has expired"
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

const createCity = async (req, res) => {
    try {
        const { name, state, country, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not autorized"
            })
        } else if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkRoute = await checkRoutePermission(admin, url);
            if (checkRoute === true) {
                const info = {
                    name: name,
                    state: state,
                    country: country,
                    status: "true",
                    createdBy: admin.role
                }

                await City.create(info)
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            message: "City is created successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).json({
                            status: 300,
                            message: "Failed! City is not created",
                            info: error
                        })
                    })
            } else {
                res.status(300).json({
                    status: 300,
                    message: "Failed! Authorization Failed",
                    info: result
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

const getCity = async (req, res) => {
    try {
        const checkCity = await City.findAll();
        if (checkCity.length !== 0) {
            const checkState = await State.findAll();
            const checkCountry = await Country.findAll();
            const filter = checkCity.map((item, index) => {
                const id = item.id;
                const name = item.name;
                const stateId = item.state;
                const countryId = item.country;
                const stateItem = checkState.filter((currElem) => { return currElem.id == item.state });
                const countryItem = checkCountry.filter((currElem) => { return currElem.id == item.country });
                const state = stateItem[0]?.name;
                const country = countryItem[0]?.name;
                const status = item.status;
                return { id, name, stateId, state, countryId, country, status }
            });
            return res.status(200).json({
                status: 200,
                message: "City data fetch successfull",
                info: filter
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! City is not found"
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

const createPincode = async (req, res) => {
    try {
        const { name, state, country, city, url } = req.body;
        const admin = req.admin;
        const errorResponse = await ErrorNullResponse(req.body);
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not autorized"
            })
        } else if (errorResponse.length !== 0) {
            return res.status(300).json({
                status: 300,
                message: errorResponse
            })
        } else {
            const checkRoute = await checkRoutePermission(admin, url);
            if (checkRoute === true) {
                const info = {
                    name: name,
                    state: state,
                    country: country,
                    city: city,
                    status: "true",
                    createdBy: admin.role
                }

                await Pincode.create(info)
                    .then((result) => {
                        res.status(200).json({
                            status: 200,
                            message: "Pincode is created successfully",
                            info: result
                        })
                    })
                    .catch((error) => {
                        res.status(300).json({
                            status: 300,
                            message: "Failed! Pincode is not created",
                            info: error
                        })
                    })
            } else {
                res.status(300).json({
                    status: 300,
                    message: "Failed! Authorization Failed",
                    info: result
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

const getPincode = async (req, res) => {
    try {
        const checkPincode = await Pincode.findAll();
        if (checkPincode.length !== 0) {
            const checkCity = await City.findAll();
            const checkState = await State.findAll();
            const checkCountry = await Country.findAll();
            const filter = checkPincode.map((item, index) => {
                const id = item.id;
                const name = item.name;
                const cityId = item.city;
                const stateId = item.state;
                const countryId = item.country;
                const stateItem = checkState.filter((currElem) => { return currElem.id == item.state });
                const countryItem = checkCountry.filter((currElem) => { return currElem.id == item.country });
                const cityItem = checkCity.filter((currElem) => { return currElem.id == item.city });
                const state = stateItem[0]?.name;
                const country = countryItem[0]?.name;
                const city = cityItem[0]?.name;
                const status = item.status;
                return { id, name, stateId, state, countryId, country, cityId, city, status }
            });
            return res.status(200).json({
                status: 200,
                message: "Pincode data fetch successfull",
                info: filter
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Failed! Pincode is not found"
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



module.exports = { getState, getCountry, checkSession, createCity, getCity, createPincode, getPincode }
const jwt = require('jsonwebtoken');
const isEmpty = require("lodash.isempty")

const generateSlug = async (email) => {
    let tokenData = {
        email: email
    }
    let slug = jwt.sign(tokenData, process.env.SECRET_KEY_USER_SLUG);
    if (isEmpty(slug)) {
        return null;
    } else {
        return slug;
    }

}

const generateAdminSlug = async (email) => {
    let tokenData = {
        email: email
    }
    let slug = jwt.sign(tokenData, process.env.SECRET_KEY_ADMIN_SLUG);
    if (isEmpty(slug)) {
        return null;
    } else {
        return slug;
    }

}

const generateRememberToken = (userId, email) => {
    let tokenData = {
        id: userId,
        email: email
    }
    let rememberToken = jwt.sign(tokenData, process.env.SECRET_KEY_USER_REMEMBER_TOKEN, { expiresIn: "15d" });

    if (isEmpty(rememberToken)) {
        return null;
    } else {
        return rememberToken;
    }
}

const generateUserAuthToken = (userId, email) => {
    let tokenData = {
        id: userId,
        email: email
    }
    let authToken = jwt.sign(tokenData, process.env.SECRET_KEY_USER_AUTH_TOKEN, { expiresIn: "7d" });

    if (isEmpty(authToken)) {
        return null;
    } else {
        return authToken;
    }
}

const generateAdminAuthToken = (id, email) => {
    let tokenData = {
        id: id,
        email: email
    }
    let authToken = jwt.sign(tokenData, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN, { expiresIn: "3h" });

    if (isEmpty(authToken)) {
        return null;
    } else {
        return authToken;
    }
}

const generateProductSlug = async (name) => {
    let tokenData = {
        name: name
    }
    let slug = jwt.sign(tokenData, process.env.SECRET_KEY_SLUG);
    if (isEmpty(slug)) {
        return null;
    } else {
        return slug;
    }

}



module.exports = { generateSlug, generateRememberToken, generateUserAuthToken, generateAdminSlug, generateAdminAuthToken, generateProductSlug }

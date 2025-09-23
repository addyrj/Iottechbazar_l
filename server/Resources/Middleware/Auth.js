const jwt = require('jsonwebtoken');
const db = require("../../DB/config");
const moment = require('moment'); // require

const User = db.user;
const Admin = db.admin;

const UserAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("auth token is    ", token)

        if (token !== undefined) {
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY_USER_AUTH_TOKEN, ((error, decode) => {
                if (error) {
                    return error;
                }
                else {
                    return decode;
                }
            }));

            if (verifyToken.id !== undefined || verifyToken.email !== undefined) {
                const userInfo = await User.findOne({ where: { userId: verifyToken.id } });
                req.token = token;
                req.user = userInfo;
            }
            else {
                let date = new Date(verifyToken.expiredAt);
                let newDate = moment(date).format('DD-MM-YYYY h:mm:ss a');

                let errorResponse = {
                    status: 302,
                    name: verifyToken.name,
                    message: "Session Expired",
                    expiredAt: newDate
                }
                return res.status(302).send(
                    newDate === "Invalid date" ? verifyToken : errorResponse
                );
            }
        } else {
            let errorResponse = {
                status: 404,
                name: "Authorization Error",
                message: "Failed! You are not authorized person",
            }
            return res.status(404).send(
                errorResponse
            );
        }
    } catch (error) {
        res.status(500).send(error);
    }
    next();
}

// const AdminAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN, ((error, decode) => {
//             if (error) {
//                 return error;
//             }
//             else {
//                 return decode;
//             }
//         }));

//         if (verifyToken.id !== undefined || verifyToken.email !== undefined) {
//             const adminInfo = await Admin.findOne({ where: { id: verifyToken.id, email: verifyToken.email } });
//             req.token = token;
//             req.admin = adminInfo;
//         }
//         else {
//             let date = new Date(verifyToken.expiredAt);
//             let newDate = moment(date).format('DD-MM-YYYY h:mm:ss a');

//             let errorResponse = {
//                 status: 302,
//                 name: verifyToken.name,
//                 message: verifyToken.message,
//                 expiredAt: newDate
//             }
//             return res.status(302).send(
//                 newDate === "Invalid date" ? verifyToken : errorResponse
//             );
//         }

//     } catch (error) {
//         res.status(500).send(error);
//     }
//     next();
// }
const AdminAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token provided. Authorization denied.",
            });
        }

        // Remove Bearer prefix if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ADMIN_AUTH_TOKEN);
        
        // Find admin
        const adminInfo = await Admin.findOne({ 
            where: { id: decoded.id, email: decoded.email } 
        });
        
        if (!adminInfo) {
            return res.status(401).json({
                status: 401,
                message: "Admin not found.",
            });
        }
        
        req.token = token;
        req.admin = adminInfo;
        next();

    } catch (error) {
        console.log("Admin Auth Error:", error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 401,
                name: error.name,
                message: "Token expired",
                expiredAt: error.expiredAt
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 401,
                name: error.name,
                message: "Invalid token"
            });
        }
        
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};

module.exports = { UserAuth, AdminAuth }
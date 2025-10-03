const db = require("../../DB/config");
const isEmpty = require("lodash.isempty")

const Role = db.role;
const Permission = db.permissionFamily;

const checkRoutePermission = async (admin, routeUrl) => {
    if (!admin) {
        return res.status(300).json({
            status: 300,
            message: "Failed! You have not authorized"
        })
    } else if (isEmpty(routeUrl)) {
        return res.status(300).json({
            status: 300,
            message: "Failed! Url is not exist"
        })
    } else {
        const checkRole = await Role.findOne({ where: { slug: admin.roleSlug } });
        if (checkRole) {
            if (checkRole.name === "Admin") {
                return true;
            } else {
                const permissionList = JSON.parse(JSON.parse(checkRole.permission));
                if (permissionList.length !== 0) {
                    const checkPermission = await Permission.findOne({ where: { url: routeUrl } })
                    if (checkPermission) {
                        const filterAuthPermission = permissionList.filter((item) => {
                            return item === checkPermission.slug
                        })
                        console.log(filterAuthPermission)
                        if (filterAuthPermission.length !== 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}

module.exports = { checkRoutePermission }
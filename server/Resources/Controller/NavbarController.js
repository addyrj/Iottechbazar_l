const { where } = require("sequelize");
const db = require("../../DB/config");
const { adminNavBarList, noPermissionNavBarList, managemntNavBarList } = require("../Function/NavbarList");

const Permission = db.permission;
const PermissionFamily = db.permissionFamily;
const Role = db.role;

const getNavbarList = async (req, res, next) => {
    try {
        const admin = req.admin;
        if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! You have not authorized"
            })
        } else {
            const checkRole = await Role.findOne({ where: { slug: admin.roleSlug } });
            if (checkRole) {
                const noNavList = await noPermissionNavBarList();
                if (checkRole.name === "Admin") {
                    const navList = await adminNavBarList();
                    if (navList.length !== 0) {
                        res.status(200).send({
                            status: 200,
                            message: "Nav Sidebar list data fetch successfully",
                            info: navList
                        })
                    } else {
                        res.status(200).send({
                            status: 200,
                            message: "Nav Sidebar list data fetch successfully",
                            info: noNavList
                        })
                    }
                } else {
                    const permissionList = await JSON.parse(JSON.parse(checkRole.permission));
                    const permissionFamiy = await PermissionFamily.findAll({ where: { slug: permissionList, navbarShown: "true" } });
                    if (permissionFamiy.length !== 0) {
                        const navList = await managemntNavBarList(permissionFamiy);
                        if (navList.length !== 0) {
                            res.status(200).send({
                                status: 200,
                                message: "Nav Sidebar list data fetch successfully",
                                info: navList
                            })
                        } else {
                            res.status(200).send({
                                status: 200,
                                message: "Nav Sidebar list data fetch successfully",
                                info: noNavList
                            })
                        }
                    } else {
                        return res.status(400).json({
                            status: 400,
                            messge: "Failed! Permission not found"
                        })
                    }
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    messge: "Failed! Role is not found"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error,
        });
    }
}

module.exports = { getNavbarList }
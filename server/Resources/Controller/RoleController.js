const isEmpty = require("lodash.isempty");
const db = require("../../DB/config");
const path = require("path")
const jwt = require("jsonwebtoken")

const Permission = db.permission;
const Role = db.role;

const addRole = async (req, res, next) => {
    try {
        const permission = req.body.Permission;
        const name = req.body.Name;
        const admin = req.admin;

        if (isEmpty(permission)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please select at least one permission to create Role"
            })
        } else if (isEmpty(name)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please enter Role Name"
            })
        } else {
            let slug = jwt.sign({ name: name }, process.env.SECRET_KEY_SLUG);

            const info = {
                slug: slug,
                name: name,
                permission: permission,
                addedBy: admin.role,
                status: "true"
            }

            await Role.create(info)
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        message: "Role created successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Role not created",
                        info: error
                    });
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

const getRole = async (req, res, next) => {
    try {
        const checkRole = await Role.findAll();
        if (checkRole.length !== 0) {
            const filterRole = checkRole.map((item, index) => {
                const id = item.id;
                const slug = item.slug;
                const name = item.name;
                const permission = JSON.parse(JSON.parse(item.permission));
                const addedBy = item.addedBy;
                const status = item.status;
                const createTime = item.createdAt;
                return {
                    id, name, slug, permission, addedBy, status, createTime
                }
            })
            res.status(200).send({
                status: 200,
                message: "Role Data fetch suucessfully",
                info: filterRole
            });
        } else {
            res.status(400).send({
                status: 400,
                message: "Failed! Role not found",
                info: error
            });
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

const updateRole = async (req, res, next) => {
    try {
        const permission = req.body.Permission;
        const name = req.body.Name;
        const admin = req.admin;
        const slug = req.body.slug;

        if (isEmpty(permission)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please enter permissions"
            })
        } else if (isEmpty(name)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Please enter Role Name"
            })
        } else if (isEmpty(slug)) {
            return res.status(300).json({
                status: 300,
                message: "Failed! Role slug is not exist"
            })
        } else if (!admin) {
            return res.status(300).json({
                status: 300,
                message: "Failed! you are not authorized"
            })
        } else {
            const info = {
                name: name,
                permission: permission
            }
            await Role.update(info, { where: { slug: slug } })
                .then((result) => {
                    res.status(200).send({
                        status: 200,
                        message: "Role updated successfully",
                        info: result
                    })
                })
                .catch((error) => {
                    res.status(300).send({
                        status: 300,
                        message: "Failed! Role not updated",
                        info: error
                    });
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

const deleteRole = async (req, res, next) => {
    try {
        const { slug } = req.body; // slug of the role to delete
        const admin = req.admin; // logged-in user info

        if (!admin) {
            return res.status(403).json({
                status: 403,
                message: "Failed! You are not authorized"
            });
        }

        if (!slug) {
            return res.status(400).json({
                status: 400,
                message: "Failed! Role slug is required"
            });
        }

        // Fetch the role to check its name
        const roleToDelete = await Role.findOne({ where: { slug } });

        if (!roleToDelete) {
            return res.status(404).json({
                status: 404,
                message: "Failed! Role not found"
            });
        }

        if (roleToDelete.name.toLowerCase() === "admin") {
            return res.status(403).json({
                status: 403,
                message: "Failed! Admin role cannot be deleted"
            });
        }

        // Delete the role
        await Role.destroy({ where: { slug } });

        return res.status(200).json({
            status: 200,
            message: "Role deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: true,
            message: error.message || error
        });
    }
    next();
};


const changeRoleStatus = async (req, res, next) => {
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

module.exports = { addRole, getRole, updateRole, deleteRole, changeRoleStatus }
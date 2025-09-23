module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define("permission", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        group: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Permission;
};

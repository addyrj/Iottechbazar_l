module.exports = (sequelize, DataTypes) => {
    const Pincode = sequelize.define("pincode", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        upatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return Pincode;
};

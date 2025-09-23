module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("address", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        optional_contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pincode: {
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
        addressType: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        defautAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otp_status: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Address;
};

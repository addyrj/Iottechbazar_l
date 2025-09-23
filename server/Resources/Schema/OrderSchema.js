module.exports = (sequelize, DataTypes) => {
    const OrderSchema = sequelize.define("order", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        orderNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        userSlug: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pincode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transactionId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transactionSignature: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transactionStatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paymentMode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalProduct: {
            type: DataTypes.STRING,
            allowNull: true
        },
        shipping: {
            type: DataTypes.STRING,
            allowNull: true
        },
        allTaxes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalBasePrice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalAmount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalDueAmount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    return OrderSchema;
};

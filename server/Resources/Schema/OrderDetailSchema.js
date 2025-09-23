module.exports = (sequelize, DataTypes) => {
    const OrderDetailSchema = sequelize.define("orderdetail", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true
        },
        specialPrice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productCount: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productTotalPrice: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return OrderDetailSchema;
};

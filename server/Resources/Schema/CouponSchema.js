module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("coupon", {
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
        coupon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discountType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        min_purchase_amount: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discountValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expireDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
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
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return Coupon;
};

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
        // NEW: Store specific product IDs
        productIds: {
            type: DataTypes.TEXT, // Store as JSON string
            allowNull: true,
        },
        // NEW: Define scope type
        scopeType: {
            type: DataTypes.ENUM('all_products', 'specific_products'),
            defaultValue: 'all_products',
            allowNull: false,
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
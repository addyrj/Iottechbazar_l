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
        appliesTo: {   // "all", "category", "product"
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "all",
        },
        categoryId: {
            type: DataTypes.STRING, // store single category id or comma-separated
            allowNull: true,
        },
        productIds: {
            type: DataTypes.TEXT,   // store JSON array of product IDs
            allowNull: true,
            get() {
                const rawValue = this.getDataValue("productIds");
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value) {
                this.setDataValue("productIds", JSON.stringify(value));
            }
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

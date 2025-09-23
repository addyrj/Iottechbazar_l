module.exports = (sequelize, DataTypes) => {
    const ProductReview = sequelize.define("productreview", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return ProductReview;
};

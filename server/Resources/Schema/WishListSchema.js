module.exports = (sequelize, DataTypes) => {
    const WishListSchema = sequelize.define("wishlist", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        userSlug: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productSlug: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    return WishListSchema;
};

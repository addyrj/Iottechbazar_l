module.exports = (sequelize, DataTypes) => {
    const CartSchema = sequelize.define("cart", {
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
        cartCount: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return CartSchema;
};

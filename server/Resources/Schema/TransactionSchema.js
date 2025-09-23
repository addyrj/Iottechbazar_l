module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transaction", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paymentId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paymentSignature: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        dueAmount: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return Transaction;
};

module.exports = (sequelize, DataTypes) => {
    const HomeSlider = sequelize.define("homeslider", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            unique: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        productSlug: {
            type: DataTypes.CHAR,
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
        updateBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return HomeSlider;
};

module.exports = (sequelize, DataTypes) => {
    const ColorVariant = sequelize.define("colorvariant", {
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
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mulLanguageName: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        value: {
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
    return ColorVariant;
};

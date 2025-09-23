module.exports = (sequelize, DataTypes) => {
    const AttributeFamily = sequelize.define("attributefamily", {
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
        attributeSlug: {
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
            unique: true,
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
    return AttributeFamily;
};

module.exports = (sequelize, DataTypes) => {
    const LegalPage = sequelize.define("legalpage", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mulLanguageTitle: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        mulLanguageValue: {
            type: DataTypes.JSON,
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
    return LegalPage;
};

module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("country", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.MEDIUMINT,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iso3: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        numeric_code: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
        phonecode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency_symbol: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subregion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        timezones: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        emoji: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return Country;
};

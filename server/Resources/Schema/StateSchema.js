module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define("state", {
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
        country_id: {
            type: DataTypes.MEDIUMINT,
            allowNull: false,
        },
        country_code: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
        iso2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        }
    });
    return State;
};

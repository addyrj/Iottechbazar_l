module.exports = (sequelize, DataTypes) => {
    const TrackLog = sequelize.define("tracklog", {
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
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        accessType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isMobile: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        isDesktop: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        location: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    });
    return TrackLog;
};

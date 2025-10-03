module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("settings", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        app_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
        },
        app_contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_favicon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_pin_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        app_social_link: {
            type: DataTypes.JSON,
            allowNull: true
        },
        admin_header_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        admin_sidebar_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        admin_theme_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        admin_font_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        admin_font_family: {
            type: DataTypes.STRING,
            allowNull: true
        },
        shipping_fee: {
            type: DataTypes.STRING,
            allowNull: true
        },
        shipping_free_limit: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_theme_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_header_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_mob_sidebar_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_mob_sidebar_text_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_footer_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_footer_title_font_color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website_footer_font_color: {
            type: DataTypes.STRING,
            allowNull: true
        },


    });
    return Admin;
};

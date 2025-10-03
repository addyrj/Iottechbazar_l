module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
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
        subScript: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mulLanguageSubscript: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        hsnCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productSku: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        colorVariantSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        categorySlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subCategorySlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attributeSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attributeFamilySlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productPrice: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productSpecialPrice: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gst: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gstRate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discountType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discount: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        basePrice: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaTag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        primaryImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        secondaryImage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        flipkartLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amazonLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        meeshoLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        multiLanguageDesc: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        specification: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        multiLanguageSpec: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        offer: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        multiLanguageOffer: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        manufacturer: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        warrantyState: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        warranty: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        multiLanguageWarranty: {
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
        createdSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        trending: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        onsale: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        commingsoon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        schoolproject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        special: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });
    return Product;
};

const { Sequelize, DataTypes } = require("sequelize");
const info = require("./info");

const sequelize = new Sequelize(
    info.DB,
    info.USER,
    info.PASSWORD,
    {
        host: info.HOST,
        dialect: info.dialcet,
            logging: false, 
        operatrosAliases: false,

        pool: {
            max: info.pool.max,
            min: info.pool.min,
            acquire: info.pool.acquire,
            idle: info.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('Connection Successful');
    })
    .catch((error) => {
        console.log('no connection', error);
    });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


///////////////////////////// collections
db.user = require("../Resources/Schema/UserSchema.js")(sequelize, DataTypes);
db.admin = require("../Resources/Schema/AdminSchema.js")(sequelize, DataTypes);
db.permission = require("../Resources/Schema/PermissionSchema.js")(sequelize, DataTypes);
db.permissionFamily = require("../Resources/Schema/PermissionFamilySchema.js")(sequelize, DataTypes);
db.role = require("../Resources/Schema/RoleSchema.js")(sequelize, DataTypes);
db.product = require("../Resources/Schema/ProductSchema.js")(sequelize, DataTypes);
db.category = require("../Resources/Schema/CategorySchema.js")(sequelize, DataTypes);
db.subCategory = require("../Resources/Schema/SubCategorySchema.js")(sequelize, DataTypes);
db.attribute = require("../Resources/Schema/AttribueSchema.js")(sequelize, DataTypes);
db.attributeFamily = require("../Resources/Schema/AttributeFamilySchema.js")(sequelize, DataTypes);
db.color = require("../Resources/Schema/ColorVariantSchema.js")(sequelize, DataTypes);
db.productTitile = require("../Resources/Schema/ProductTitileSchema.js")(sequelize, DataTypes);
db.language = require("../Resources/Schema/LanguageSchema.js")(sequelize, DataTypes);
db.cart = require("../Resources/Schema/CartSchema.js")(sequelize, DataTypes);
db.wishlist = require("../Resources/Schema/WishListSchema.js")(sequelize, DataTypes);
db.address = require("../Resources/Schema/AddressSchema.js")(sequelize, DataTypes);
db.state = require("../Resources/Schema/StateSchema.js")(sequelize, DataTypes)
db.country = require("../Resources/Schema/CountrySchema.js")(sequelize, DataTypes)
db.order = require("../Resources/Schema/OrderSchema.js")(sequelize, DataTypes)
db.orderDetail = require("../Resources/Schema/OrderDetailSchema.js")(sequelize, DataTypes)
db.setting = require("../Resources/Schema/SettingSchema.js")(sequelize, DataTypes)
db.orderStatusTitle = require("../Resources/Schema/OrderStTitleSchema.js")(sequelize, DataTypes)
db.productReview = require("../Resources/Schema/ProductReviewSchema.js")(sequelize, DataTypes)
db.legalPage = require("../Resources/Schema/LegalPageSchema.js")(sequelize, DataTypes)
db.homeSlider = require("../Resources/Schema/HomeSliderSchema.js")(sequelize, DataTypes)
db.blog = require("../Resources/Schema/BlogSchema.js")(sequelize, DataTypes)
db.coupon = require("../Resources/Schema/CouponSchema.js")(sequelize, DataTypes)
db.socialLink = require("../Resources/Schema/AppSocialLinkSchema.js")(sequelize, DataTypes)
db.city = require("../Resources/Schema/CitySchema.js")(sequelize, DataTypes)
db.pincode = require("../Resources/Schema/PinCodeSchema.js")(sequelize, DataTypes)
db.contactUs = require("../Resources/Schema/ContactUsSchema.js")(sequelize, DataTypes)
db.trackLog = require("../Resources/Schema/TrackLogSchema.js")(sequelize, DataTypes)

/////////////////////////////////////////////////

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Yes re-sync done")
    }).catch((error) => {
        console.log("re-sync error  ", error)
    });

module.exports = db
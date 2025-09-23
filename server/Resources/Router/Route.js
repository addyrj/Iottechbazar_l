const { addAddress, getAddress, updateAddress, removeAddress } = require("../Controller/AddressController");
const { adminPasswordGenerator, adminLogin, adminGetProfile, checkShowPassword } = require("../Controller/AdminController");
const { addAttribute, getAttribute, updateAttribute, deleteAttribute, changeAttributeStatus, addAttributeLanguage } = require("../Controller/AttributeController");
const { addAttributeFamily, getAttributeFamily, updateAttributeFamily, deleteAttributeFamily, changeAttributeStatusFamily, getAllAttributeFamily, createAttributeFamilyLanguage } = require("../Controller/AttributeFamilyController");
const { createBlog, getBlog, updateBlog, deleteBlog, chnageBlogStatus } = require("../Controller/BlogController");
const { sendOtp, verifyOtp } = require("../Controller/BroadCastController");
const { addCart, getCart, getAdminCart, updateCartItem, removeCart } = require("../Controller/CartController");
const { addCategory, getCategory, updateCategory, deleteCategory, changeCategoryStatus, updateCategoryLanguages } = require("../Controller/CategoryController");
const { generateOrder, verifyPayemnt, getAdminOrder, changeOrderStatus, getTransactionList, getOrder } = require("../Controller/CheckoutController");
const { createColor, getColor, updateColor, deleteColor, changeColorStatus, createColorLanguage } = require("../Controller/ColorController");
const { createEnquiry, getAllEnquiry } = require("../Controller/ContactUsController");
const { createCoupons, getCoupons } = require("../Controller/CouponController");
const { checkIp, checkDeviceOrigin, testApi, createAdminTrackLog, createUserTrackLog, getTrackLog } = require("../Controller/ExtraDataController");
const { createSlider, getSlider } = require("../Controller/HomeSliderConroller");
const { createLanguage, getLanguage } = require("../Controller/LanguageController");
const { createPage, getPage, updatePage, deletePage, changePageStatus, getPageClient } = require("../Controller/LegalPageController");
const { addManager, getManager } = require("../Controller/ManagementController");
const { getNavbarList } = require("../Controller/NavbarController");
const { addOrderStatusTitle, getOrderStatusTitle } = require("../Controller/OrderStatusTitleController");
const { addPermission, getPermission, checkRouteAuthPermission, addPermissionFamily, getPermissionFamily } = require("../Controller/PermissionController");
const { addProduct, getProduct, updateProduct, deleteProduct, changeProductStatus, getProductDetail, addSecondaryImages, addProductTitle, getProductTitle, createProductInfoMultiLanguage, getProductSection, addProductReview, getProductReview, getProductAdminReview, updateProductReview } = require("../Controller/ProductController");
const { addRole, getRole, updateRole } = require("../Controller/RoleController");
const { createApplicationInfo, getApplicationInfo, addShipping, getShipping, addAdminTheme, getAdminTheme, createWebsiteTheme, getWebsiteTheme } = require("../Controller/SettingController");
const { createSocialLink, getSocialLink, updateSocialLink } = require("../Controller/SocialLinkController");
const { addSubCategory, getAllSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, changeSubCategoryStatus, createSubCategoryMulText } = require("../Controller/SubCategoryController");
const { userRegister, userLogin, getProfile, editProfile, changePassword, sendLoginOtp, verifyLoginOtp, getCustomer } = require("../Controller/UserController");
const { getCountry, getState, checkSession, createCity, getCity, createPincode, getPincode } = require("../Controller/UtilsController");
const { addWishList, getWishList, removeWishList } = require("../Controller/WishListController");
const { UserAuth, AdminAuth } = require("../Middleware/Auth");
const uploadFiles = require("../Middleware/uploadfiles");

const express = require("express");

const router = express.Router();

//    user register
router.post("/user_register", uploadFiles.single("avatar"), userRegister);

//    user login
router.post("/user_login", uploadFiles.none(), userLogin);

//    send login otp
router.post("/sendLoginOtp", uploadFiles.none(), sendLoginOtp);

//    verify login otp
router.post("/verifyLoginOtp", uploadFiles.none(), verifyLoginOtp);

//    get profile
router.get("/user_profile", UserAuth, uploadFiles.none(), getProfile);

//    send otp
router.post("/send_otp", uploadFiles.none(), sendOtp);

//    verify otp
router.post("/verify_otp", uploadFiles.none(), verifyOtp);

//    edit profile
router.get("/edit_profile", uploadFiles.single("avatar"), editProfile);

//    change password
router.get("/change_password", uploadFiles.none(), changePassword);

//    check ip
router.get("/checkIp", uploadFiles.none(), checkIp);

//    check origin
router.get("/checkDeviceOrigin", uploadFiles.none(), checkDeviceOrigin);

//    test api
router.get("/testApi", uploadFiles.none(), testApi);

//                       AdminPanel

// admin password generator
router.post("/adminPasswordGenerator", uploadFiles.none(), adminPasswordGenerator)

// admin login
router.post("/adminLogin", uploadFiles.none(), adminLogin)

// admin get profile
router.get("/adminProfile", AdminAuth, uploadFiles.none(), adminGetProfile)

// admin add permission
router.post("/addPermission", AdminAuth, uploadFiles.none(), addPermission)

// admin add permission
router.get("/getPermission", AdminAuth, uploadFiles.none(), getPermission)

// admin add permission family
router.post("/addPermissionFamily", AdminAuth, uploadFiles.none(), addPermissionFamily)

// admin get permission family
router.get("/getPermissionFamily", AdminAuth, uploadFiles.none(), getPermissionFamily)

// admin add role
router.post("/addRole", AdminAuth, uploadFiles.none(), addRole)

// admin get role
router.get("/getRole", AdminAuth, uploadFiles.none(), getRole)

// admin add manager
router.post("/addManagement", AdminAuth, uploadFiles.single("avatar"), addManager)

// get manager
router.get("/getManager", AdminAuth, uploadFiles.none(), getManager)

// get admin customer list
router.get("/getCustomerList", AdminAuth, uploadFiles.none(), getCustomer)

// get admin customer cart list
router.get("/adminUserCart", AdminAuth, uploadFiles.none(), getAdminCart)

// add product
router.post("/addProduct", AdminAuth, uploadFiles.single('avatar'), addProduct)

// add secondary images
router.post("/addSecondaryProductImage", AdminAuth, uploadFiles.array('avatar', 12), addSecondaryImages)

// get product
router.get("/getProduct", uploadFiles.none(), getProduct)

// get product section
router.get("/getProductSection", uploadFiles.none(), getProductSection)

// get product detail
router.post("/getProductDetail", AdminAuth, uploadFiles.none(), getProductDetail)

// update product
router.post("/updateProduct", AdminAuth, uploadFiles.array('avatar', 12), updateProduct)

// delete product
router.post("/deleteProduct", AdminAuth, uploadFiles.none(), deleteProduct)

// change product status
router.post("/changeProductStatus", AdminAuth, uploadFiles.none(), changeProductStatus)

// add product info multi language
router.post("/addProductInfoMultiText", AdminAuth, uploadFiles.none(), createProductInfoMultiLanguage)

// add attribute
router.post("/addAtribute", AdminAuth, uploadFiles.none(), addAttribute)

// get attribute
router.get("/getAttribute", uploadFiles.none(), getAttribute)

// update attribute
router.post("/updateAttribute", AdminAuth, uploadFiles.none(), updateAttribute)

// delete attribute
router.post("/deleteAttribute", AdminAuth, uploadFiles.none(), deleteAttribute)

// chnage attributeStatus
router.post("/changeAttributeStatus", AdminAuth, uploadFiles.none(), changeAttributeStatus)

// add attribute language
router.post("/addAttributeLanguage", AdminAuth, uploadFiles.none(), addAttributeLanguage)

// add attribute family
router.post("/addAttributeFamily", AdminAuth, uploadFiles.none(), addAttributeFamily)

// get attribute family
router.post("/getAttributeFamily", uploadFiles.none(), getAttributeFamily)

// get all attribute family
router.get("/getAllAttributeFamily", AdminAuth, uploadFiles.none(), getAllAttributeFamily)

// update attribute family
router.post("/updateAttributeFamily", AdminAuth, uploadFiles.none(), updateAttributeFamily)

// delete attribute family
router.post("/deleteAttributeFamily", AdminAuth, uploadFiles.none(), deleteAttributeFamily)

// chnage attributeStatus family
router.post("/changeAttributeStatusFamily", AdminAuth, uploadFiles.none(), changeAttributeStatusFamily)

// add attribute family language
router.post("/addAttributeFamilyLanguage", AdminAuth, uploadFiles.none(), createAttributeFamilyLanguage)

// add Category
router.post("/addCategory", AdminAuth, uploadFiles.single("avatar"), addCategory)

// get Category
router.get("/getCategory", uploadFiles.none(), getCategory)

// update Category
router.post("/updateCategory", AdminAuth, uploadFiles.single("avatar"), updateCategory)

// update Category language
router.post("/updateCategoryLanguage", AdminAuth, uploadFiles.none(), updateCategoryLanguages)

// delete Category
router.post("/deleteCategory", AdminAuth, uploadFiles.none(), deleteCategory)

// change Category status
router.get("/changeCategoryStatus", AdminAuth, uploadFiles.none(), changeCategoryStatus)

// add sub Category
router.post("/addSubCategory", AdminAuth, uploadFiles.single("avatar"), addSubCategory)

// get all-sub-Category
router.get("/getAllSubCategory", AdminAuth, uploadFiles.none(), getAllSubCategory)

// get-sub-category
router.post("/getSubCategory", uploadFiles.none(), getSubCategory)

// update sub category
router.post("/updateSubCategory", AdminAuth, uploadFiles.none(), updateSubCategory)

// delete Category
router.post("/deleteSubCategory", AdminAuth, uploadFiles.none(), deleteSubCategory)

// change Category status
router.get("/changeSubCategoryStatus", AdminAuth, uploadFiles.none(), changeSubCategoryStatus)

// add sub-Category language
router.post("/addSubCategoryLanguage", AdminAuth, uploadFiles.none(), createSubCategoryMulText)

// check route permission
router.post("/checkAuthRoute", AdminAuth, uploadFiles.none(), checkRouteAuthPermission)

// show password
router.get("/showPassword", uploadFiles.none(), checkShowPassword)

// update role
router.post("/updateRole", AdminAuth, uploadFiles.none(), updateRole)

// add color
router.post("/addColor", AdminAuth, uploadFiles.none(), createColor)

// get color
router.get("/getColor", uploadFiles.none(), getColor)

// update color
router.post("/updateColor", AdminAuth, uploadFiles.none(), updateColor)

// delete color
router.post("/deleteColor", AdminAuth, uploadFiles.none(), deleteColor)

// change color status
router.get("/chnageColorStatus", AdminAuth, uploadFiles.none(), changeColorStatus)

// add color language
router.post("/addColorLanguage", AdminAuth, uploadFiles.none(), createColorLanguage)

// route admin side bar list
router.get("/adminNavBarList", AdminAuth, uploadFiles.none(), getNavbarList)

// add product title
router.post("/addProductTitile", AdminAuth, uploadFiles.none(), addProductTitle)

// get product title
router.get("/getProductTitile", AdminAuth, uploadFiles.none(), getProductTitle)

// create Language
router.post("/createLangugae", AdminAuth, uploadFiles.none(), createLanguage)

// add cart
router.post("/addCart", UserAuth, uploadFiles.none(), addCart)

// get cart
router.get("/getCart", UserAuth, uploadFiles.none(), getCart)

// update cart item
router.post("/updateCartItem", UserAuth, uploadFiles.none(), updateCartItem)

// remove cart item
router.post("/removeCart", UserAuth, uploadFiles.none(), removeCart)

//  add wishlist
router.post("/addWishlist", UserAuth, uploadFiles.none(), addWishList)

// get cart
router.get("/getWishlist", UserAuth, uploadFiles.none(), getWishList)

// update wishlist
router.post("/removeWishlistItem", UserAuth, uploadFiles.none(), removeWishList)

//  add address
router.post("/addAddress", UserAuth, uploadFiles.none(), addAddress)

// get address
router.get("/getAddress", UserAuth, uploadFiles.none(), getAddress)

// update address
router.post("/updateAddress", UserAuth, uploadFiles.none(), updateAddress)

// delete address
router.post("/deleteAddress", UserAuth, uploadFiles.none(), removeAddress)

// get Langugae
router.get("/getLanguage", uploadFiles.none(), getLanguage)

// get country
router.get("/getCountry", uploadFiles.none(), getCountry)

// get state
router.get("/getState", uploadFiles.none(), getState)

// create app info
router.post("/createAppInfo", AdminAuth, uploadFiles.array('avatar', 12), createApplicationInfo)

// get app info
router.get("/getAppInfo", uploadFiles.none(), getApplicationInfo)

// generate order
router.post("/generateOrder", UserAuth, uploadFiles.none(), generateOrder)

// verify order getAdminOrder
router.post("/verifyPayment", UserAuth, uploadFiles.none(), verifyPayemnt)

// get admin order list
router.get("/getAdminOrder", AdminAuth, uploadFiles.none(), getAdminOrder)

// change order status
router.post("/changeOrderStatus", AdminAuth, uploadFiles.none(), changeOrderStatus)

// get transacttion list
router.get("/getTransactionList", AdminAuth, uploadFiles.none(), getTransactionList)

//  check user session
router.get("/checkSession", UserAuth, uploadFiles.none(), checkSession)

//  check order status title
router.post("/createOrderStatusTitle", AdminAuth, uploadFiles.none(), addOrderStatusTitle)

//  check order status title
router.get("/getOrderStatusTitle", uploadFiles.none(), getOrderStatusTitle)

// add product review
router.post("/addProductReview", UserAuth, uploadFiles.none(), addProductReview)

// get product review
router.post("/getProductReview", uploadFiles.none(), getProductReview)

// update product review
router.get("/getProductAdminReview", AdminAuth, uploadFiles.none(), getProductAdminReview)

// add product review
router.post("/updateProductReview", AdminAuth, uploadFiles.none(), updateProductReview)

// add legal page
router.post("/createLegalPage", AdminAuth, uploadFiles.none(), createPage)

// get legal page
router.get("/getLegalPage", uploadFiles.none(), getPage)

// get legal page client
router.post("/getLegalPageClient", uploadFiles.none(), getPageClient)

// update legal page
router.post("/updateLegalPage", AdminAuth, uploadFiles.none(), updatePage)

// delete legal page
router.post("/deleteLegalPage", AdminAuth, uploadFiles.none(), deletePage)

// change page status
router.post("/changePageStatus", AdminAuth, uploadFiles.none(), changePageStatus)

// create slider
router.post("/createSlider", AdminAuth, uploadFiles.single("avatar"), createSlider)

// get slider
router.get("/getHomeSlider", uploadFiles.none(), getSlider)

// create coupon
router.post("/createCoupon", AdminAuth, uploadFiles.single("avatar"), createCoupons)

// get all coupons
router.get("/getCoupons", AdminAuth, uploadFiles.none(), getCoupons)

// create/update Shipping
router.post("/updateShipping", AdminAuth, uploadFiles.none(), addShipping)

// get Shipping
router.get("/getShipping", uploadFiles.none(), getShipping)

// create/update admin theme
router.post("/createAdminTheme", AdminAuth, uploadFiles.none(), addAdminTheme)

// get admin theme
router.get("/getAdminTheme", AdminAuth, uploadFiles.none(), getAdminTheme)

// create/update website theme
router.post("/createWebsiteTheme", AdminAuth, uploadFiles.none(), createWebsiteTheme)

// get website theme
router.get("/getWebTheme", uploadFiles.none(), getWebsiteTheme)

// create social link
router.post("/createSocialLink", AdminAuth, uploadFiles.none(), createSocialLink)

// get admin theme
router.get("/getSocialLink", uploadFiles.none(), getSocialLink)

// update social link
router.post("/updateSocialLink", AdminAuth, uploadFiles.none(), updateSocialLink)

// create city
router.post("/createCity", AdminAuth, uploadFiles.none(), createCity)

// get city
router.get("/getCity", uploadFiles.none(), getCity)

// create pincode
router.post("/createpincode", AdminAuth, uploadFiles.none(), createPincode)

// get pin code
router.get("/getpincode", uploadFiles.none(), getPincode)

// create conct us query
router.post("/createEnquiry", uploadFiles.none(), createEnquiry)

// get pin code
router.get("/getAllEnquiry", AdminAuth, uploadFiles.none(), getAllEnquiry)

// create blog
router.post("/createBlog", AdminAuth, uploadFiles.single("avatar"), createBlog)

// get blog
router.get("/getBlog", uploadFiles.none(), getBlog)

// update blog
router.post("/updateBlog", AdminAuth, uploadFiles.none(), updateBlog)

// delete blog
router.post("/deleteBlog", AdminAuth, uploadFiles.none(), deleteBlog)

// change blog status
router.post("/changeBlogStatus", AdminAuth, uploadFiles.none(), chnageBlogStatus)

// get user order
router.get("/getOrder", UserAuth, uploadFiles.none(), getOrder)

// create admin track log
router.post("/createAdminTrackLog", AdminAuth, uploadFiles.none(), createAdminTrackLog)

// create user track log
router.post("/createUserTrackLog", UserAuth, uploadFiles.none(), createUserTrackLog)

// get track log
router.get("/getTrackLog", AdminAuth, uploadFiles.none(), getTrackLog)

/////////////////////  get image router   ///////////////////////////////
router.use('/images', express.static(process.cwd() + '/files'))

module.exports = router
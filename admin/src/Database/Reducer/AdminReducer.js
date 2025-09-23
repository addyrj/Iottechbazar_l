import { CONTROL_SIDE_BAR, GET_ADD_IMAGE_MODAL_STATE, GET_ORDER_STATUS_TITLE, MY_API_ERROR, PAGE_ERROR_NAVIGATION, SET_ADMIN_BLOGS, SET_ADMIN_COUPONS, SET_ADMIN_CUSTOMER_CART_LIST, SET_ADMIN_CUSTOMER_LIST, SET_ADMIN_MANAGER, SET_ADMIN_NAV_SIDERBAR_LIST, SET_ADMIN_ORDER, SET_ADMIN_PERMISSION, SET_ADMIN_PERMISSION_FAMILY, SET_ADMIN_PRODUCT_REVIEW, SET_ADMIN_ROLE, SET_ADMIN_SLIDER, SET_ADMIN_THEME, SET_ALL_ATTRIBUTE_FAMILY, SET_ALL_PRODUCTS, SET_ALL_SUB_CATEGORY_DATA, SET_APP_LANGUAGE, SET_APP_SOCAIL_LINK, SET_APPLICATION_INFO, SET_ATTRIBUTE_DATA, SET_ATTRIBUTE_FAMILY_DATA, SET_AUTH_ROUTE_DATA, SET_CATEGORY_DATA, SET_CITY, SET_COLOR_VARIANT_DATA, SET_CONTACT_US_QUERY, SET_COUNTRY, SET_LEGAL_PAGES, SET_LOADER, SET_ORDER_STATUS_TITLE, SET_PINCODE, SET_PRODUCT_TITLES, SET_STATE, SET_SUB_CATEGORY_DATA, SET_TESTING_API, SET_TRANSACTION_HISTORY, SET_USER_TRACK_LOG, SET_WEBSITE_THEME } from "../Constant/AdminConst";

const initialState = {
    loader: false,
    sideBarState: "fixed",
    permission: [],
    permissionFamily: [],
    role: [],
    manager: [],
    errorNavigation: false,
    testingApi: [],
    routeAuth: {},
    categoryData: [],
    allSubCategoryData: [],
    subCategoryData: [],
    attributeData: [],
    allFamilyAttribute: [],
    familyAttributeData: [],
    colorVariant: [],
    allProducts: [],
    addImageModalState: false,
    addProductImageInfo: { slug: "", name: "" },
    navbarList: [],
    productTitles: [],
    languages: [],
    catLanState: false,
    subCatLanState: false,
    attributeLanState: false,
    attributeFamilyLanState: false,
    colorLanState: false,
    productLanState: false,
    countryList: [],
    stateList: [],
    appInfo: {},
    orderStatusTitle: [],
    customerList: [],
    cartList: [],
    productReview: [],
    order: [],
    transactionHistory: [],
    legalPageList: [],
    homeSlider: [],
    adminBlogs: [],
    coupons: [],
    getAdminTheme: {},
    getWebsiteTheme: {},
    appSocialLink: [],
    cityList: [],
    pincodeList: [],
    contactUsQuery: [],
    trackLog: []
}
const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }

        case MY_API_ERROR:
            return {
                ...state,
                loader: false
            }

        case SET_TESTING_API:
            return {
                ...state,
                testingApi: action.payload
            }

        case CONTROL_SIDE_BAR:
            let sideBar = "";
            const { sideBarState } = state;
            if (sideBarState === "fixed") {
                sideBar = "collapsed"
            } else {
                sideBar = "fixed"
            }
            return {
                ...state,
                sideBarState: sideBar
            }

        case SET_ADMIN_PERMISSION:
            return {
                ...state,
                permission: action.payload
            }

        case SET_ADMIN_PERMISSION_FAMILY:
            return {
                ...state,
                permissionFamily: action.payload
            }

        case SET_ADMIN_ROLE:
            return {
                ...state,
                role: action.payload
            }

        case SET_ADMIN_MANAGER:
            return {
                ...state,
                manager: action.payload
            }
        case PAGE_ERROR_NAVIGATION:
            return {
                ...state,
                errorNavigation: action.payload
            }
        case SET_AUTH_ROUTE_DATA:
            return {
                ...state,
                routeAuth: action.payload
            }
        case SET_CATEGORY_DATA:
            return {
                ...state,
                categoryData: action.payload
            }
        case SET_ALL_SUB_CATEGORY_DATA:
            return {
                ...state,
                allSubCategoryData: action.payload
            }
        case SET_SUB_CATEGORY_DATA:
            return {
                ...state,
                subCategoryData: action.payload
            }

        case SET_ATTRIBUTE_DATA:
            return {
                ...state,
                attributeData: action.payload
            }
        case SET_ALL_ATTRIBUTE_FAMILY:
            return {
                ...state,
                allFamilyAttribute: action.payload
            }
        case SET_ATTRIBUTE_FAMILY_DATA:
            return {
                ...state,
                familyAttributeData: action.payload
            }
        case SET_COLOR_VARIANT_DATA:
            return {
                ...state,
                colorVariant: action.payload
            }
        case SET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            }
        case GET_ADD_IMAGE_MODAL_STATE:
            return {
                ...state,
                addImageModalState: action.payload.state,
                addProductImageInfo: {
                    slug: action.payload.slug,
                    name: action.payload.name
                }
            }
        case SET_ADMIN_NAV_SIDERBAR_LIST:
            return {
                ...state,
                navbarList: action.payload
            }
        case SET_PRODUCT_TITLES:
            return {
                ...state,
                productTitles: action.payload
            }
        case SET_APP_LANGUAGE:
            return {
                ...state,
                languages: action.payload
            }
        case SET_COUNTRY:
            return {
                ...state,
                countryList: action.payload
            }

        case SET_STATE:
            return {
                ...state,
                stateList: action.payload
            }

        case SET_APPLICATION_INFO:
            return {
                ...state,
                appInfo: action.payload
            }

        case SET_ORDER_STATUS_TITLE:
            return {
                ...state,
                orderStatusTitle: action.payload
            }

        case SET_ADMIN_CUSTOMER_LIST:
            return {
                ...state,
                customerList: action.payload
            }

        case SET_ADMIN_CUSTOMER_CART_LIST:
            return {
                ...state,
                cartList: action.payload
            }

        case SET_ADMIN_PRODUCT_REVIEW:
            return {
                ...state,
                productReview: action.payload
            }

        case SET_ADMIN_ORDER:
            return {
                ...state,
                order: action.payload
            }

        case SET_TRANSACTION_HISTORY:
            return {
                ...state,
                transactionHistory: action.payload
            }

        case SET_LEGAL_PAGES:
            return {
                ...state,
                legalPageList: action.payload
            }

        case SET_ADMIN_SLIDER:
            return {
                ...state,
                homeSlider: action.payload
            }

        case SET_ADMIN_BLOGS:
            return {
                ...state,
                adminBlogs: action.payload
            }

        case SET_ADMIN_COUPONS:
            return {
                ...state,
                coupons: action.payload
            }

        case SET_ADMIN_THEME:
            return {
                ...state,
                getAdminTheme: action.payload,
            }

        case SET_WEBSITE_THEME:
            return {
                ...state,
                getWebsiteTheme: action.payload
            }

        case SET_APP_SOCAIL_LINK:
            return {
                ...state,
                appSocialLink: action.payload

            }

        case SET_CITY:
            return {
                ...state,
                cityList: action.payload
            }

        case SET_PINCODE:
            return {
                ...state,
                pincodeList: action.payload
            }

        case SET_CONTACT_US_QUERY:
            return {
                ...state,
                contactUsQuery: action.payload
            }

        case SET_USER_TRACK_LOG:
            return {
                ...state,
                trackLog: action.payload
            }

        default:
            return state;
    }
}

export default AdminReducer
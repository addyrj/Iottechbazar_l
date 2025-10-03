import { data } from "jquery"
import { ADMIN_LOGIN, ATTRIBUTE_MODAL_STATE, ATTRIBUTEFAMILY_MODAL_STATE, CATEGORY_MODAL_STATE, CHANGE_API_SETTING_STATE, CHECK_AUTH_ROUTE, COLOR_MODAL_STATE, CONTROL_SIDE_BAR, GET_ADD_IMAGE_MODAL_STATE, GET_ADMIN_BLOGS, GET_ADMIN_COUPONS, GET_ADMIN_CUSTOMER_CART_LIST, GET_ADMIN_CUSTOMER_LIST, GET_ADMIN_MANAGER, GET_ADMIN_NAV_SIDERBAR_LIST, GET_ADMIN_ORDER, GET_ADMIN_PERMISSION, GET_ADMIN_PERMISSION_FAMILY, GET_ADMIN_PRODUCT_REVIEW, GET_ADMIN_ROLE, GET_ADMIN_SLIDER, GET_ADMIN_THEME, GET_ALL_ATTRIBUTE_FAMILY, GET_ALL_PRODUCTS, GET_ALL_SUB_CATEGORY_DATA, GET_APP_LANGUAGE, GET_APP_SOCAIL_LINK, GET_APPLICATION_INFO, GET_ATTRIBUTE_DATA, GET_ATTRIBUTE_FAMILY_DATA, GET_CATEGORY_DATA, GET_CITY, GET_COLOR_VARIANT_DATA, GET_CONTACT_US_QUERY, GET_COUNTRY, GET_LEGAL_PAGES, GET_ORDER_STATUS_TITLE, GET_PINCODE, GET_PRODUCT_TITLES, GET_STATE, GET_SUB_CATEGORY_DATA, GET_TESTING_API, GET_TRANSACTION_HISTORY, GET_TRANSACTION_SEARCH_HISTORY, GET_USER_TRACK_LOG, GET_WEBSITE_THEME, PAGE_ERROR_NAVIGATION, PRODUCT_MODAL_STATE, SET_LOADER, SUBCATEGORY_MODAL_STATE } from "../Constant/AdminConst"


export const controlSideBar = () => {
    return {
        type: CONTROL_SIDE_BAR
    }
}
export const adminLogin = (item) => {
    return {
        type: ADMIN_LOGIN,
        data: item
    }
}

export const getTestApiData = () => {
    return {
        type: GET_TESTING_API
    }
}

export const getAdminPermission = (item) => {
    return {
        type: GET_ADMIN_PERMISSION,
        data: item
    }
}

export const getAdminPermissionFamily = (item) => {
    return {
        type: GET_ADMIN_PERMISSION_FAMILY,
        data: item
    }
}

export const setLoder = (item) => {
    return {
        type: SET_LOADER,
        payload: item
    }
}

export const getRole = (item) => {
    return {
        type: GET_ADMIN_ROLE,
        data: item
    }
}

export const getManager = (item) => {
    return {
        type: GET_ADMIN_MANAGER,
        data: item
    }
}

export const errorNavigation = (item) => {
    return {
        type: PAGE_ERROR_NAVIGATION,
        payload: item
    }
}

export const checkAuthRoute = (item) => {
    console.log(item)
    return {
        type: CHECK_AUTH_ROUTE,
        data: item
    }
}

export const getCategoryData = (item) => {
    return {
        type: GET_CATEGORY_DATA,
        data: item
    }
}

export const getAllSubCategoryData = (item) => {
    return {
        type: GET_ALL_SUB_CATEGORY_DATA,
        data: item
    }
}

export const getSubCategoryData = (item) => {
    return {
        type: GET_SUB_CATEGORY_DATA,
        data: item
    }
}

export const getAttributeData = (item) => {
    return {
        type: GET_ATTRIBUTE_DATA,
        data: item
    }
}

export const getAllFamilyAttribute = (item) => {
    return {
        type: GET_ALL_ATTRIBUTE_FAMILY,
        data: item
    }
}

export const getFamilyAttributeData = (item) => {
    return {
        type: GET_ATTRIBUTE_FAMILY_DATA,
        data: item
    }
}

export const getColorVarinat = (item) => {
    return {
        type: GET_COLOR_VARIANT_DATA,
        data: item
    }
}

export const getAllProducts = (item) => {
    return {
        type: GET_ALL_PRODUCTS,
        data: item
    }
}

export const getAddImageModalState = (item) => {
    return {
        type: GET_ADD_IMAGE_MODAL_STATE,
        payload: item
    }
}

export const getNavSideBarList = (item) => {
    return {
        type: GET_ADMIN_NAV_SIDERBAR_LIST,
        data: item
    }
}

export const getProductTitiles = (item) => {
    return {
        type: GET_PRODUCT_TITLES,
        data: item
    }
}

export const getAppLanguages = () => {
    return {
        type: GET_APP_LANGUAGE
    }
}


// catlog language modal state

export const categoryLanState = (item) => {
    return {
        type: CATEGORY_MODAL_STATE,
        payload: item
    }
}

export const subCategoryLanState = (item) => {
    return {
        type: SUBCATEGORY_MODAL_STATE,
        payload: item
    }
}

export const attributeLanState = (item) => {
    return {
        type: ATTRIBUTE_MODAL_STATE,
        payload: item
    }
}

export const attributeFamilyLanState = (item) => {
    return {
        type: ATTRIBUTEFAMILY_MODAL_STATE,
        payload: item
    }
}

export const changeColorLanState = (item) => {
    return {
        type: COLOR_MODAL_STATE,
        payload: item
    }
}

export const productLanState = (item) => {
    return {
        type: PRODUCT_MODAL_STATE,
        payload: item
    }
}

export const getAppState = (item) => {
    return {
        type: GET_STATE,
        payload: item
    }
}

export const getAppCountry = (item) => {
    return {
        type: GET_COUNTRY,
        payload: item
    }
}

export const getAppInfo = () => {
    return {
        type: GET_APPLICATION_INFO
    }
}

export const getOrderStatusTitle = (item) => {
    return {
        type: GET_ORDER_STATUS_TITLE,
        data: item
    }
}

export const getAdminCustomerList = () => {
    return {
        type: GET_ADMIN_CUSTOMER_LIST
    }
}

export const getAdminCsutomerCart = (item) => {
    return {
        type: GET_ADMIN_CUSTOMER_CART_LIST,
        data: item
    }
}

export const getAdminProductReview = (item) => {
    return {
        type: GET_ADMIN_PRODUCT_REVIEW,
        data: item
    }
}

export const getAdminOrder = (item) => {
    return {
        type: GET_ADMIN_ORDER,
        data: item
    }
}

export const getTransactionHistory = (item) => {
    return {
        type: GET_TRANSACTION_HISTORY,
        data: item
    }
}

export const getTransactionSearchHistory = (item) => {
    return {
        type: GET_TRANSACTION_SEARCH_HISTORY,
        data: item
    }
}

export const getAdminLegalPages = (item) => {
    return {
        type: GET_LEGAL_PAGES,
        data: item
    }
}

export const getAdminSlider = () => {
    return {
        type: GET_ADMIN_SLIDER
    }
}

export const getAdminBlogs = (item) => {
    return {
        type: GET_ADMIN_BLOGS,
        data: item
    }
}

export const getAdminCoupons = (item) => {
    return {
        type: GET_ADMIN_COUPONS,
        data: item
    }
}

export const getAdminTheme = (item) => {
    return {
        type: GET_ADMIN_THEME,
        data: item
    }
}

export const getWebsiteTheme = () => {
    return {
        type: GET_WEBSITE_THEME
    }
}

export const getAppSocialLink = () => {
    return {
        type: GET_APP_SOCAIL_LINK
    }
}

export const getCity = () => {
    return {
        type: GET_CITY
    }
}

export const getPincode = () => {
    return {
        type: GET_PINCODE
    }
}

export const chnageSettingApiState = (item) => {
    return {
        type: CHANGE_API_SETTING_STATE,
        payload: item
    }
}

export const getContactUsQuery = (item) => {
    return {
        type: GET_CONTACT_US_QUERY,
        data: item
    }
}

export const getUserTrackLog = (item) => {
    return {
        type: GET_USER_TRACK_LOG,
        data: item
    }
}
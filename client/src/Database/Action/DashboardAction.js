import { CHECK_USER_SESSION, GET_ALL_CATEGORY, GET_ALL_LANGUAGES, GET_ALL_PRODUCT, GET_ALL_PRODUCT_SECTION, GET_ALL_SUB_CATEGORY, GET_APP_BLOGS, GET_APP_INFO, GET_APP_SOCIAL_LINK, GET_FILTER_PRODUCT, GET_HOME_SLIDER, GET_LEGAL_PAGE_LIST, GET_PRODUCT_RATING_REVIEW, GET_PRODUCT_VIA_PAGINATION, GET_SORT_VALUE, GET_USER_ADDRESS, GET_USER_CART, GET_USER_COUNTRY, GET_USER_ORDER, GET_USER_PROFILE, GET_USER_STATE, GET_USER_WISHLIST, OPEN_IMAGE_SHOW_MODAL, SET_LOADER, SET_TAB_HEADER_STATE, SET_TAB_SPECIAL_PRODUCT_STATE, UPDATE_CART_ITEM_LISST } from "../Constant"

export const setLoader = (item) => {
    return {
        type: SET_LOADER,
        payload: item
    }
}

export const getAllCategory = () => {
    return {
        type: GET_ALL_CATEGORY
    }
}

export const getAllSubCategory = () => {
    return {
        type: GET_ALL_SUB_CATEGORY
    }
}

export const getAllProduct = () => {
    return {
        type: GET_ALL_PRODUCT
    }
}

export const getAllCategoriesProduct = () => {
    return {
        type: GET_ALL_PRODUCT_SECTION
    }
}

export const openImageModal = (item) => {
    return {
        type: OPEN_IMAGE_SHOW_MODAL,
        payload: item
    }
}

export const setTabHeaderState = (item) => {
    return {
        type: SET_TAB_HEADER_STATE,
        payload: item
    }
}

export const setTabSpeProductState = (item) => {
    return {
        type: SET_TAB_SPECIAL_PRODUCT_STATE,
        payload: item
    }
}

export const setProductViaPagination = (item) => {
    return {
        type: GET_PRODUCT_VIA_PAGINATION,
        payload: item
    }
}

export const sortProduct = (item) => {
    return {
        type: GET_SORT_VALUE,
        payload: item
    }
}

export const productFilter = (item) => {
    return {
        type: GET_FILTER_PRODUCT,
        data: item
    }
}

export const getAllLanguages = () => {
    return {
        type: GET_ALL_LANGUAGES
    }
}

export const getUserProfile = (item) => {
    return {
        type: GET_USER_PROFILE,
        data: item
    }
}

export const getUserCart = (item) => {
    return {
        type: GET_USER_CART,
        data: item
    }
}

export const updateCartItemList = (item) => {
    return {
        type: UPDATE_CART_ITEM_LISST,
        data: item
    }
}

export const getUserWishlist = (item) => {
    return {
        type: GET_USER_WISHLIST,
        data: item
    }
}

export const getUserAddress = (item) => {
    return {
        type: GET_USER_ADDRESS,
        data: item
    }
}

export const getCountry = () => {
    return {
        type: GET_USER_COUNTRY
    }
}

export const getState = () => {
    return {
        type: GET_USER_STATE
    }
}

export const getAppInfo = () => {
    return {
        type: GET_APP_INFO
    }
}

export const checkLoginSession = (item) => {
    return {
        type: CHECK_USER_SESSION,
        data: item
    }
}

export const getProductRetingReview = (item) => {
    return {
        type: GET_PRODUCT_RATING_REVIEW,
        data: item
    }
}

export const getLegalPageList = () => {
    return {
        type: GET_LEGAL_PAGE_LIST
    }
}

export const getHomeSlider = () => {
    return {
        type: GET_HOME_SLIDER
    }
}

export const getAppSocialLink = () => {
    return {
        type: GET_APP_SOCIAL_LINK
    }
}

export const getAppBlogs = () => {
    return {
        type: GET_APP_BLOGS
    }
}

export const getOrder = (item) => {
    return {
        type: GET_USER_ORDER,
        data: item
    }
}
import { act } from "react";
import { allProduct } from "../../Utils/CustomList";
import { GET_ALL_SUB_CATEGORY, GET_PRODUCT_VIA_PAGINATION, GET_SORT_VALUE, MY_API_ERROR, OPEN_IMAGE_SHOW_MODAL, SET_ALL_CATEGORY, SET_ALL_LANGUAGES, SET_ALL_PRODUCT, SET_ALL_PRODUCT_SECTION, SET_APP_BLOGS, SET_APP_INFO, SET_APP_SOCIAL_LINK, SET_FILTER_PRODUCT, SET_HOME_SLIDER, SET_LEGAL_PAGE_LIST, SET_LOADER, SET_PRODUCT_RATING_REVIEW, SET_SORT_VALUE, SET_TAB_HEADER_STATE, SET_TAB_SPECIAL_PRODUCT_STATE, SET_USER_ADDRESS, SET_USER_CART, SET_USER_COUNTRY, SET_USER_ORDER, SET_USER_PROFILE, SET_USER_STATE, SET_USER_WISHLIST } from "../Constant";

const initialState = {
    loader: false,
    allProducts: [],
    allCategory: [],
    allSubCategory: [],
    imageModal: false,
    tabHeaderState: 1,
    tabSpeProductState: 1,
    productViaPagination: [],
    filterProduct: [],
    languageList: [],
    userProfile: {},
    userCart: [],
    userWishList: [],
    allCategorizedProduct: {},
    userAddress: [],
    countryList: [],
    stateList: [],
    appInfo: {},
    ratingReview: [],
    legalPageList: [],
    homeSlider: [],
    appSocialLink: [],
    averageRating: "",
    appBlogs: [],
    userOrder: []

}
const DashboardReducer = (state = initialState, action) => {
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
        case SET_ALL_CATEGORY:
            return {
                ...state,
                allCategory: action.payload
            }
        case OPEN_IMAGE_SHOW_MODAL:
            return {
                ...state,
                imageModal: action.payload
            }

        case SET_TAB_HEADER_STATE:
            return {
                ...state,
                tabHeaderState: action.payload
            }

        case SET_TAB_SPECIAL_PRODUCT_STATE:
            return {
                ...state,
                tabSpeProductState: action.payload
            }
        case GET_PRODUCT_VIA_PAGINATION:
            return {
                ...state,
                productViaPagination: action.payload,
                filterProduct: action.payload
            }

        case SET_SORT_VALUE:
            return {
                ...state,
                filterProduct: action.payload
            };

        case SET_FILTER_PRODUCT:
            return {
                ...state,
                filterProduct: action.payload
            };

        case SET_ALL_LANGUAGES:
            return {
                ...state,
                languageList: action.payload
            }

        case SET_ALL_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }

        case SET_USER_CART:
            return {
                ...state,
                userCart: action.payload
            }

        case SET_USER_WISHLIST:
            return {
                ...state,
                userWishList: action.payload
            }

        case SET_ALL_PRODUCT_SECTION:
            return {
                ...state,
                allCategorizedProduct: action.payload
            }

        case SET_USER_ADDRESS:
            return {
                ...state,
                userAddress: action.payload
            }

        case SET_USER_COUNTRY:
            return {
                ...state,
                countryList: action.payload
            }

        case SET_USER_STATE:
            return {
                ...state,
                stateList: action.payload
            }

        case SET_APP_INFO:
            return {
                ...state,
                appInfo: action.payload
            }

        case SET_PRODUCT_RATING_REVIEW:
            return {
                ...state,
                ratingReview: action.payload.reviewList,
                averageRating: action.payload.avgRating
            }

        case SET_LEGAL_PAGE_LIST:
            return {
                ...state,
                legalPageList: action.payload
            }
        case SET_HOME_SLIDER:
            return {
                ...state,
                homeSlider: action.payload
            }

        case SET_APP_SOCIAL_LINK:
            return {
                ...state,
                appSocialLink: action.payload
            }

        case SET_APP_BLOGS:
            return {
                ...state,
                appBlogs: action.payload
            }

        case SET_USER_ORDER:
            return {
                ...state,
                userOrder: action.payload
            }

        default:
            return state;
    }
}

export default DashboardReducer
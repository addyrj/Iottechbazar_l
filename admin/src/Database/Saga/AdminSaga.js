import { put, takeEvery } from "redux-saga/effects"
import { ADMIN_LOGIN, CHECK_AUTH_ROUTE, GET_ADMIN_BLOGS, GET_ADMIN_COUPONS, GET_ADMIN_CUSTOMER_CART_LIST, GET_ADMIN_CUSTOMER_LIST, GET_ADMIN_MANAGER, GET_ADMIN_NAV_SIDERBAR_LIST, GET_ADMIN_ORDER, GET_ADMIN_PERMISSION, GET_ADMIN_PERMISSION_FAMILY, GET_ADMIN_PRODUCT_REVIEW, GET_ADMIN_ROLE, GET_ADMIN_SLIDER, GET_ADMIN_THEME, GET_ALL_ATTRIBUTE_FAMILY, GET_ALL_PRODUCTS, GET_ALL_SUB_CATEGORY_DATA, GET_APP_LANGUAGE, GET_APP_SOCAIL_LINK, GET_APPLICATION_INFO, GET_ATTRIBUTE_DATA, GET_ATTRIBUTE_FAMILY_DATA, GET_CATEGORY_DATA, GET_CITY, GET_COLOR_VARIANT_DATA, GET_CONTACT_US_QUERY, GET_COUNTRY, GET_LEGAL_PAGES, GET_ORDER_STATUS_TITLE, GET_PINCODE, GET_PRODUCT_TITLES, GET_STATE, GET_SUB_CATEGORY_DATA, GET_TESTING_API, GET_TRANSACTION_HISTORY, GET_TRANSACTION_SEARCH_HISTORY, GET_USER_TRACK_LOG, GET_WEBSITE_THEME, MY_API_ERROR, PAGE_ERROR_NAVIGATION, SET_ADMIN_BLOGS, SET_ADMIN_COUPONS, SET_ADMIN_CUSTOMER_CART_LIST, SET_ADMIN_CUSTOMER_LIST, SET_ADMIN_MANAGER, SET_ADMIN_NAV_SIDERBAR_LIST, SET_ADMIN_ORDER, SET_ADMIN_PERMISSION, SET_ADMIN_PERMISSION_FAMILY, SET_ADMIN_PRODUCT_REVIEW, SET_ADMIN_ROLE, SET_ADMIN_SLIDER, SET_ADMIN_THEME, SET_ALL_ATTRIBUTE_FAMILY, SET_ALL_PRODUCTS, SET_ALL_SUB_CATEGORY_DATA, SET_APP_LANGUAGE, SET_APP_SOCAIL_LINK, SET_APPLICATION_INFO, SET_ATTRIBUTE_DATA, SET_ATTRIBUTE_FAMILY_DATA, SET_AUTH_ROUTE_DATA, SET_CATEGORY_DATA, SET_CITY, SET_COLOR_VARIANT_DATA, SET_CONTACT_US_QUERY, SET_COUNTRY, SET_LEGAL_PAGES, SET_LOADER, SET_ORDER_STATUS_TITLE, SET_PINCODE, SET_PRODUCT_TITLES, SET_STATE, SET_SUB_CATEGORY_DATA, SET_TESTING_API, SET_TRANSACTION_HISTORY, SET_USER_TRACK_LOG, SET_WEBSITE_THEME } from "../Constant/AdminConst"
import axios from "axios"
import { toast } from "react-hot-toast"
import { getHeaderWithToken, getHeaderWithoutToken, postHeaderWithToken, postHeaderWithoutToken } from "../Utils"
import isEmpty from "lodash.isempty"

function* getTestApiData() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get("https://jsonplaceholder.typicode.com/comments");
        if (response.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_TESTING_API, payload: response.data })
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* adminLogin(action) {
    console.log(action)
    try {
        yield put({ type: SET_LOADER, payload: true })
        let fromData = new FormData();
        fromData.append("Email", action.data.email)
        fromData.append("Password", action.data.password)
        let response = yield axios.post(process.env.REACT_APP_BASE_URL + "adminLogin", fromData, postHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield localStorage.setItem("iottechAdminToken", response.data.token);
            action.data.navigate("/admin_dashboard");
            toast.success(response?.data?.message);
            window.location.reload(false);
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminPermission(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getPermission", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ADMIN_PERMISSION, payload: response.data.info })
            // toast.success(response?.data?.message);
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminPermissionFamily(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getPermissionFamily", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ADMIN_PERMISSION_FAMILY, payload: response.data.info })
            // toast.success(response?.data?.message);
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminRole(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getRole", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ADMIN_ROLE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminManager(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getManager", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ADMIN_MANAGER, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* checkAuthRoute(action) {
    try {
        if (isEmpty(action.data.url)) {
            console.log(action.data.url)
        } else {
            let formData = new FormData();
            formData.append("routeUrl", action.data.url)

            yield put({ type: SET_LOADER, payload: true })
            let response = yield axios.post(process.env.REACT_APP_BASE_URL + "checkAuthRoute", formData, postHeaderWithToken);
            if (response.data.status === 200) {
                yield put({ type: SET_LOADER, payload: false })
                yield put({ type: SET_AUTH_ROUTE_DATA, payload: response.data })
            }
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getCategoryData(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCategory", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_CATEGORY_DATA, payload: response.data.info })
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAllSubCategoryData(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAllSubCategory", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ALL_SUB_CATEGORY_DATA, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getSubCategoryData(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let formData = new FormData();
        formData.append("slug", action.data.slug)
        let response = yield axios.post(process.env.REACT_APP_BASE_URL + "getSubCategory", formData, postHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_SUB_CATEGORY_DATA, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAttributeData(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAttribute", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ATTRIBUTE_DATA, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAttributeFamilyData(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let formData = new FormData();
        formData.append("slug", action.data.slug)
        let response = yield axios.post(process.env.REACT_APP_BASE_URL + "getAttributeFamily", formData, postHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ATTRIBUTE_FAMILY_DATA, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAllAttributeFamily(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAllAttributeFamily", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ALL_ATTRIBUTE_FAMILY, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getColorVariantData() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getColor", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_COLOR_VARIANT_DATA, payload: response.data.info })
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAllProducts() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getProduct", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ALL_PRODUCTS, payload: response.data.info })
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminSideBarList(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "adminNavBarList", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_ADMIN_NAV_SIDERBAR_LIST, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getProductTitles(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getProductTitile", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_PRODUCT_TITLES, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAppLanguages() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getLanguage", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false })
            yield put({ type: SET_APP_LANGUAGE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getCountry() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCountry", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_COUNTRY, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getState() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getState", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_STATE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAppInfo() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAppInfo", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_APPLICATION_INFO, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getOrderStatusTitle() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getOrderStatusTitle", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ORDER_STATUS_TITLE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminCustomerList(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCustomerList", getHeaderWithToken);
        if (response.data.status === 200) {
            console.log("error is   ", response.data.info)
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_CUSTOMER_LIST, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminCustomerCartList(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "adminUserCart", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_CUSTOMER_CART_LIST, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminProductReview(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getProductAdminReview", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_PRODUCT_REVIEW, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminOrder(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAdminOrder", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_ORDER, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getTransactionHistory(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getTransactionList", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_TRANSACTION_HISTORY, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getLegalPage(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getLegalPage", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_LEGAL_PAGES, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminSlider() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getHomeSlider", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_SLIDER, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getTransactionSearchHistory(action) {
    try {
        yield put({ type: SET_LOADER, payload: true });


        const newList = [...action.data.list];
        const searchInput = action.data.searchInput;

        const filterList = yield newList?.filter((item) => {
            return item.order_id === searchInput.orderId || item.id === searchInput.transactionId
        })

        if (filterList.length !== 0) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_TRANSACTION_HISTORY, payload: filterList })
        } else {
            yield put({ type: SET_LOADER, payload: false });
            toast.error("Failed! Transaction is not exist");
        }

    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
    }
}

function* getCoupons(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCoupons", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_COUPONS, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminTheme(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAdminTheme", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_THEME, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getWebsiteTheme() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getWebTheme", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_WEBSITE_THEME, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getSocialLnk() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getSocialLink", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_APP_SOCAIL_LINK, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getCity() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCity", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_CITY, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}


function* getPincode() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getpincode", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_PINCODE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getContactUsQuery(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAllEnquiry", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_CONTACT_US_QUERY, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAdminBlog(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getBlog", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ADMIN_BLOGS, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getUserTrackLog(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getTrackLog", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_USER_TRACK_LOG, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
            window.location.reload(false)
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}


function* AdminSaga() {
    yield takeEvery(GET_TESTING_API, getTestApiData)
    yield takeEvery(ADMIN_LOGIN, adminLogin)
    yield takeEvery(GET_ADMIN_PERMISSION, getAdminPermission)
    yield takeEvery(GET_ADMIN_PERMISSION_FAMILY, getAdminPermissionFamily)
    yield takeEvery(GET_ADMIN_ROLE, getAdminRole)
    yield takeEvery(GET_ADMIN_MANAGER, getAdminManager)
    yield takeEvery(CHECK_AUTH_ROUTE, checkAuthRoute)
    yield takeEvery(GET_CATEGORY_DATA, getCategoryData)
    yield takeEvery(GET_ALL_SUB_CATEGORY_DATA, getAllSubCategoryData)
    yield takeEvery(GET_SUB_CATEGORY_DATA, getSubCategoryData)
    yield takeEvery(GET_ATTRIBUTE_DATA, getAttributeData)
    yield takeEvery(GET_ATTRIBUTE_FAMILY_DATA, getAttributeFamilyData)
    yield takeEvery(GET_ALL_ATTRIBUTE_FAMILY, getAllAttributeFamily)
    yield takeEvery(GET_COLOR_VARIANT_DATA, getColorVariantData)
    yield takeEvery(GET_ALL_PRODUCTS, getAllProducts)
    yield takeEvery(GET_ADMIN_NAV_SIDERBAR_LIST, getAdminSideBarList)
    yield takeEvery(GET_PRODUCT_TITLES, getProductTitles)
    yield takeEvery(GET_APP_LANGUAGE, getAppLanguages)
    yield takeEvery(GET_STATE, getState)
    yield takeEvery(GET_COUNTRY, getCountry)
    yield takeEvery(GET_APPLICATION_INFO, getAppInfo)
    yield takeEvery(GET_ORDER_STATUS_TITLE, getOrderStatusTitle)
    yield takeEvery(GET_ADMIN_CUSTOMER_LIST, getAdminCustomerList)
    yield takeEvery(GET_ADMIN_CUSTOMER_CART_LIST, getAdminCustomerCartList)
    yield takeEvery(GET_ADMIN_PRODUCT_REVIEW, getAdminProductReview)
    yield takeEvery(GET_ADMIN_ORDER, getAdminOrder)
    yield takeEvery(GET_TRANSACTION_HISTORY, getTransactionHistory)
    yield takeEvery(GET_TRANSACTION_SEARCH_HISTORY, getTransactionSearchHistory)
    yield takeEvery(GET_LEGAL_PAGES, getLegalPage)
    yield takeEvery(GET_ADMIN_SLIDER, getAdminSlider)
    yield takeEvery(GET_ADMIN_COUPONS, getCoupons)
    yield takeEvery(GET_ADMIN_THEME, getAdminTheme)
    yield takeEvery(GET_WEBSITE_THEME, getWebsiteTheme)
    yield takeEvery(GET_APP_SOCAIL_LINK, getSocialLnk)
    yield takeEvery(GET_CITY, getCity)
    yield takeEvery(GET_PINCODE, getPincode)
    yield takeEvery(GET_CONTACT_US_QUERY, getContactUsQuery)
    yield takeEvery(GET_ADMIN_BLOGS, getAdminBlog)
    yield takeEvery(GET_USER_TRACK_LOG, getUserTrackLog)
}

export default AdminSaga
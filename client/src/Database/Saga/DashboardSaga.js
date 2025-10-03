import { put, takeEvery } from "redux-saga/effects"
import axios from "axios"
import { toast } from "react-hot-toast"
import { CHECK_USER_SESSION, GET_ALL_CATEGORY, GET_ALL_LANGUAGES, GET_ALL_PRODUCT, GET_ALL_PRODUCT_SECTION, GET_APP_BLOGS, GET_APP_INFO, GET_APP_SOCIAL_LINK, GET_FILTER_PRODUCT, GET_HOME_SLIDER, GET_LEGAL_PAGE_LIST, GET_PRODUCT_RATING_REVIEW, GET_SORT_VALUE, GET_USER_ADDRESS, GET_USER_CART, GET_USER_COUNTRY, GET_USER_ORDER, GET_USER_PROFILE, GET_USER_STATE, GET_USER_WISHLIST, MY_API_ERROR, SET_ALL_CATEGORY, SET_ALL_LANGUAGES, SET_ALL_PRODUCT, SET_ALL_PRODUCT_SECTION, SET_APP_BLOGS, SET_APP_INFO, SET_APP_SOCIAL_LINK, SET_FILTER_PRODUCT, SET_HOME_SLIDER, SET_LEGAL_PAGE_LIST, SET_LOADER, SET_PRODUCT_RATING_REVIEW, SET_SORT_VALUE, SET_USER_ADDRESS, SET_USER_CART, SET_USER_COUNTRY, SET_USER_ORDER, SET_USER_PROFILE, SET_USER_STATE, SET_USER_WISHLIST } from "../Constant"
import { getHeaderWithoutToken, getHeaderWithToken, postHeaderWithoutToken } from "../ApiHeader"

function* getAllCategory() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCategory", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ALL_CATEGORY, payload: response.data.info });
        }

    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log("error is   ", error)
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getSortProduct(action) {
    try {
        let newSortData;
        const sortingProduct = (a, b) => {

            if (action.payload.title === "b") {
                return a.name.localeCompare(b.name);
            }

            if (action.payload.title === "c") {
                return b.name.localeCompare(a.name);

            }

            if (action.payload.title === "d") {
                return a.productSpecialPrice - b.productSpecialPrice;
            }

            if (action.payload.title === "e") {
                return b.productSpecialPrice - a.productSpecialPrice;
            }
        };
        if (action.payload.title === "a") {
            yield put({ type: SET_SORT_VALUE, payload: action.payload.productList })
        } else {
            newSortData = action.payload.productList.sort(sortingProduct);
            yield put({ type: SET_SORT_VALUE, payload: newSortData })
        }
    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log(error)
    }
}

function* getFilterProduct(action) {
    try {
        const title = action.data.title;
        let tempFilterProduct = action.data.productList;
        if (title === "sub-category") {
            tempFilterProduct = tempFilterProduct.filter((currElem) =>
                currElem.subCategoryName === action.data.name
            );
        }

        if (title === 'clear_all') {
            tempFilterProduct = [...tempFilterProduct]
        }

        if (title === 'priceRange') {
            tempFilterProduct = tempFilterProduct.filter((currElem) =>
                parseInt(currElem.productSpecialPrice) > action.data.minPrice && parseInt(currElem.productSpecialPrice) <= action.data.maxPrice
            );
        }

        yield put({ type: SET_FILTER_PRODUCT, payload: tempFilterProduct })

    } catch (error) {
        yield put({ type: MY_API_ERROR, payload: false })
        console.log(error)
    }
}

function* getAllLanguage() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getLanguage", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ALL_LANGUAGES, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAllProduct() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getProduct", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ALL_PRODUCT, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getUserProfile(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "user_profile", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_USER_PROFILE, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false });
        toast.error(error?.response?.data?.message || error.message)
    }
}


function* getUserCart(action) {
    try {
        const userinfo = localStorage.getItem("iottechUserInfo");
        if (userinfo !== null) {
            yield put({ type: SET_LOADER, payload: true })
            let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getCart", getHeaderWithToken);
            if (response.data.status === 200) {
                yield put({ type: SET_LOADER, payload: false });
                yield put({ type: SET_USER_CART, payload: response.data.info })
            }
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status !== 400) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
}

function* getUserWishlist(action) {
    try {
        const userinfo = localStorage.getItem("iottechUserInfo");
        console.log("userinfo wish    ", getHeaderWithToken)
        if (userinfo !== null) {
            yield put({ type: SET_LOADER, payload: true })
            let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getWishlist", getHeaderWithToken);
            if (response.data.status === 200) {
                yield put({ type: SET_LOADER, payload: false });
                yield put({ type: SET_USER_WISHLIST, payload: response.data.info })
            }
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status !== 400) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
}

function* getCategororizedProduct() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getProductSection", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_ALL_PRODUCT_SECTION, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getCustomerAddress(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getAddress", getHeaderWithToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_USER_ADDRESS, payload: response.data.info })
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
            yield put({ type: SET_USER_COUNTRY, payload: response.data.info })
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
            yield put({ type: SET_USER_STATE, payload: response.data.info })
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
            yield put({ type: SET_APP_INFO, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* checkUserSession(action) {

    try {
        const userinfo = localStorage.getItem("iottechUserInfo");
        if (userinfo !== null) {
            let response = yield axios.get(process.env.REACT_APP_BASE_URL + "checkSession", getHeaderWithToken);
            if (response.data.status === 200) {
                yield put({ type: SET_LOADER, payload: false });
            }
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        if (error?.response?.data?.status === 300) {
            yield localStorage.removeItem("iottechUserInfo");
            window.location.reload(false);
        } else if (error?.response?.data?.status === 302) {
            yield localStorage.removeItem("iottechUserInfo");
            window.location.reload(false);
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getProductReview(action) {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let formData = new FormData();
        formData.append("productId", action.data.productId);
        formData.append("productSlug", action.data.productSlug);
        let response = yield axios.post(process.env.REACT_APP_BASE_URL + "getProductReview", formData, postHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_PRODUCT_RATING_REVIEW, payload: { reviewList: response.data.info, avgRating: response.data.avgRating } })

        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        yield put({ type: SET_PRODUCT_RATING_REVIEW, payload: { reviewList: [], avgRating: "" } })
        // toast.error(error?.response?.data?.message || error.message)
    }
}

function* getLegalPage() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getLegalPage", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_LEGAL_PAGE_LIST, payload: response.data.info })

        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getHomeSlider() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getHomeSlider", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_HOME_SLIDER, payload: response.data.info })

        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}


function* getSocialLink() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getSocialLink", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_APP_SOCIAL_LINK, payload: response.data.info })

        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getAppBlogs() {
    try {
        yield put({ type: SET_LOADER, payload: true })
        let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getBlog", getHeaderWithoutToken);
        if (response.data.status === 200) {
            yield put({ type: SET_LOADER, payload: false });
            yield put({ type: SET_APP_BLOGS, payload: response.data.info })
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false })
        toast.error(error?.response?.data?.message || error.message)
    }
}

function* getOrder(action) {
    try {
        const userinfo = localStorage.getItem("iottechUserInfo");
        if (userinfo !== null) {
            yield put({ type: SET_LOADER, payload: true })
            let response = yield axios.get(process.env.REACT_APP_BASE_URL + "getOrder", getHeaderWithToken);
            if (response.data.status === 200) {
                yield put({ type: SET_LOADER, payload: false });
                yield put({ type: SET_USER_ORDER, payload: response.data.info })
            }
        }
    } catch (error) {
        console.log("error is   ", error)
        yield put({ type: MY_API_ERROR, payload: false });
        if (error?.response?.data?.status === 302) {
            action.data.navigate("/")
        }
        toast.error(error?.response?.data?.message || error.message)
    }
}


function* DashboardSaga() {
    yield takeEvery(GET_ALL_CATEGORY, getAllCategory)
    yield takeEvery(GET_SORT_VALUE, getSortProduct)
    yield takeEvery(GET_FILTER_PRODUCT, getFilterProduct)
    yield takeEvery(GET_ALL_LANGUAGES, getAllLanguage)
    yield takeEvery(GET_ALL_PRODUCT, getAllProduct)
    yield takeEvery(GET_USER_CART, getUserCart)
    yield takeEvery(GET_USER_PROFILE, getUserProfile)
    yield takeEvery(GET_USER_WISHLIST, getUserWishlist)
    yield takeEvery(GET_ALL_PRODUCT_SECTION, getCategororizedProduct)
    yield takeEvery(GET_USER_ADDRESS, getCustomerAddress)
    yield takeEvery(GET_USER_COUNTRY, getCountry)
    yield takeEvery(GET_USER_STATE, getState)
    yield takeEvery(GET_APP_INFO, getAppInfo)
    yield takeEvery(CHECK_USER_SESSION, checkUserSession)
    yield takeEvery(GET_PRODUCT_RATING_REVIEW, getProductReview)
    yield takeEvery(GET_LEGAL_PAGE_LIST, getLegalPage)
    yield takeEvery(GET_HOME_SLIDER, getHomeSlider)
    yield takeEvery(GET_APP_SOCIAL_LINK, getSocialLink)
    yield takeEvery(GET_APP_BLOGS, getAppBlogs)
    yield takeEvery(GET_USER_ORDER, getOrder)
}

export default DashboardSaga
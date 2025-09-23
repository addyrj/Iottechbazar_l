import axios from "axios";
import { put, takeEvery } from "redux-saga/effects"
import { GET_TEST_ALL_PRODUCT, SET_LOADER, SET_TEST_ALL_PRODUCT } from "../Constant/AdminConst";
import { getHeaderWithoutToken } from "../Utils";

function* getTestAllProduct() {
    yield put({ type: SET_LOADER, data: true });
    try {
        const response = yield axios.get(process.env.REACT_APP_BASE_URL + "get-all-products", getHeaderWithoutToken);
        if (response.data.status === "200") {
            yield put({ type: SET_LOADER, data: false });
            yield put({ type: SET_TEST_ALL_PRODUCT, data: response.data })
        }
    } catch (error) {
        yield put({ type: SET_LOADER, data: false });
        console.log(error);
    }
}

function* UserDashboardSaga() {
    yield takeEvery(GET_TEST_ALL_PRODUCT, getTestAllProduct);
}

export default UserDashboardSaga;
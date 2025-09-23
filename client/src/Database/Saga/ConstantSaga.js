/* eslint-disable require-yield */
import { put, takeEvery } from "redux-saga/effects"
import { SET_UPDATE_CART_ITEM_LIST, UPDATE_CART_ITEM_LISST } from "../Constant"
import toast from "react-hot-toast"

function* updateCartItem(action) {
    if (!action.data.newList) {
        toast.error("Failed! List is not defined")
    } else {
        const filterDuplicate = action.data?.oldList.filter(item => item.id === action.data.newList.id);

        if (filterDuplicate.length !== 0) {
            const modifyCart = action.data.oldList.map(obj => {
                if (obj.id === action.data.newList.id) {
                    return { ...obj, count: action.data.newList.count };
                }
                return obj;
            });
            yield put({ type: SET_UPDATE_CART_ITEM_LIST, payload: modifyCart })
        } else {
            yield put({ type: SET_UPDATE_CART_ITEM_LIST, payload: [...action.data.oldList, action.data.newList] })
        }
    }
}

function* ConstantSaga() {
    yield takeEvery(UPDATE_CART_ITEM_LISST, updateCartItem)
}

export default ConstantSaga
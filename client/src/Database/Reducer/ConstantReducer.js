import { MY_API_ERROR, SET_LOADER, SET_UPDATE_CART_ITEM_LIST } from "../Constant";

const initialState = {
    loader: false,
    updateCartItemList: []
}

const ConstantReducer = (state = initialState, action) => {
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
        case SET_UPDATE_CART_ITEM_LIST:
            return {
                ...state,
                updateCartItemList: action.payload
            }

        default:
            return state;
    }
}

export default ConstantReducer
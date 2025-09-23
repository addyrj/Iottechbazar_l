import { combineReducers } from "redux";
import AdminReducer from "./Reducer/AdminReducer";
import ConstantReducer from "./Reducer/ConstantReducer";

export default combineReducers({
    AdminReducer,
    ConstantReducer,
})
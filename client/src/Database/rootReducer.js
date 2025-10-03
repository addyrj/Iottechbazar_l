import { combineReducers } from "redux";
import DashboardReducer from "./Reducer/DashboardReducer";
import ConstantReducer from "./Reducer/ConstantReducer";

export default combineReducers({
    DashboardReducer,
    ConstantReducer
})
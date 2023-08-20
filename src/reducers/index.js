import { combineReducers } from "redux";
import counterReducer from "./testReducer";
import loginReducer from "./loginReducer";
import hotelReducer from "./hotelReducer";

const reducers = combineReducers({
    test: counterReducer,
    userInfo: loginReducer,
    hotelList: hotelReducer
})

export default reducers
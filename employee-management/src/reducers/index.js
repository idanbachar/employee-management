import employeeReducer from "./employeeReducer";
import userReducer from './userReducer';
import { combineReducers } from "redux";

const allReducers = combineReducers({
    employee: employeeReducer,
    user: userReducer
});

export default allReducers;
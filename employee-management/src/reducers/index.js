import employeeReducer from "./employeeReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    employee: employeeReducer
});

export default allReducers;
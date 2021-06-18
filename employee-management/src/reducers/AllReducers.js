import EmployeeReducer from './EmployeeReducer'
import { combineReducers } from "redux";

const AllReducers = combineReducers({
    employee: EmployeeReducer
});

export default AllReducers;
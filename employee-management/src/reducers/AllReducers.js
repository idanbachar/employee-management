import EmployeeReducer from './employeeReducer'
import MobileReducer from './MobileReducer';
import { combineReducers } from "redux";

const AllReducers = combineReducers({
    employee: EmployeeReducer,
    isMobile: MobileReducer
});

export default AllReducers;
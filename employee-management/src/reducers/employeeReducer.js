
const initialState = [];

const employeeReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'INIT':
            state = action.payload;
            return state;
        case 'ADD':
            return [...state, action.payload];
        case 'UPDATE':
            const employees = [...state];
            const employeeIndex = employees.findIndex(employee => {
                return employee.id === action.payload.id;
            });

            employees[employeeIndex].firstname = action.payload.firstname;
            employees[employeeIndex].lastname = action.payload.lastname;
            employees[employeeIndex].phone = action.payload.phone;
            employees[employeeIndex].address = action.payload.address;
            employees[employeeIndex].role = action.payload.role;
            employees[employeeIndex].startDate = action.payload.startDate;

            state = employees;

            return state;
        default:
            return state;
    }
}

export default employeeReducer;
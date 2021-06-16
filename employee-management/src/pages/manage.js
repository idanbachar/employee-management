import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddEmployee from '../components/AddEmployee/addEmployee';
import EditEmployee from '../components/EditEmployee/editEmployee';
import { v4 as uuidv4 } from 'uuid';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Manage = () => {

    const [employees, setEmployees] = useState([]);
    const employeeReducerState = useSelector(state => state.employee);
    const dispatch = useDispatch();

    const [addEmployeeModalShow, setEmployeeModalShow] = useState(false);
    const [editEmployeeModalShow, setEditEmployeeModalShow] = useState(false);

    useEffect(async () => {
        getEmployees();

    }, [])

    const getEmployees = async () => {
        let data = await api.get('/')
            .then(({ data }) => data);
        setEmployees(data);
        dispatch({
            type: 'INIT',
            payload: data
        })
    }

    const deleteEmployee = async (id) => {
        let data = await api.delete(`/${id}`);
        getEmployees();
    }

    const addEmployee = async (employee) => {
        const request = {
            id: uuidv4(),
            ...employee
        };

        const response = await api.post(`/`, request);
        let updatedEmployees = [...employees];
        updatedEmployees.push(response.data);
        setEmployees(updatedEmployees);
        dispatch({
            type: 'ADD',
            payload: updatedEmployees
        })
        setEmployeeModalShow(false);
    }


    return (
        <div>
            <h2 align="left">Managing Employees</h2>
            <div align="right">
                <Button variant="primary" onClick={() => setEmployeeModalShow(true)}>
                    + Add Employee
                </Button>
            </div>
            <AddEmployee addEmployee={addEmployee} show={addEmployeeModalShow} onHide={() => setEmployeeModalShow(false)} />

            <div style={{ backgroundColor: 'white', fontSize: '18px', fontFamily: 'arial', textAlign: 'center', boxShadow: '0px 5px 19px 3px #888888' }}>

                <Table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Roll</th>
                            <th>Start Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee =>
                            <EmployeeCard
                                id={employee.id}
                                firstname={employee.firstname}
                                lastname={employee.lastname}
                                phone={employee.phone}
                                address={employee.address}
                                roll={employee.roll}
                                startdate={employee.startdate}
                                isEditable={true}
                                deleteHandler={() => deleteEmployee(employee.id)}
                            />
                        )}
                    </tbody>
                </Table>
            </div >
        </div >
    )
}

export default Manage;
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import AddEmployee from '../components/AddEmployee/addEmployee';
import { v4 as uuidv4 } from 'uuid';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Manage = () => {

    const [employees, setEmployees] = useState([]);
    const [addEmployeeModalShow, setEmployeeModalShow] = useState(false);

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        let data = await api.get('/')
            .then(({ data }) => data);
        setEmployees(data);
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
        setEmployeeModalShow(false);
    }

    return (
        <div>

            <Button variant="primary" onClick={() => setEmployeeModalShow(true)}>
                Add Employee
            </Button>

            <AddEmployee addEmployee={addEmployee} show={addEmployeeModalShow} onHide={() => setEmployeeModalShow(false)} />

            <div style={{ backgroundColor: 'white', fontSize: '20px', textAlign: 'center' }}>

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
                        {employees.map(e =>
                            <tr>
                                <td>{e.firstname}</td>
                                <td>{e.lastname}</td>
                                <td>{e.phone}</td>
                                <td>{e.address}</td>
                                <td>{e.roll}</td>
                                <td>{e.startdate}</td>
                                <td><button>Edit</button><button onClick={() => deleteEmployee(e.id)}>Remove</button></td>
                            </tr>)}

                    </tbody>
                </Table>

            </div >
        </div>
    )
}

export default Manage;
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(async () => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        let data = await api.get('/')
            .then(({ data }) => data);
        setEmployees(data);
    }

    return (
        <div>
            <h2 align="left">Employees</h2>

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
                            </tr>)}

                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default Employees;
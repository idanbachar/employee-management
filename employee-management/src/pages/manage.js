import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Manage = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        let data = await api.get('/').then(({ data }) => data);
        setEmployees(data);
    }

    const deleteEmployee = async (id) => {

        let data = await api.delete(`/${id}`);
        getEmployees();
    }

    return (
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
    )

}

export default Manage;
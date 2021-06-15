import React, { useEffect, useState } from 'react';
import Employee from '../components/employee/employee';
import Table from 'react-bootstrap/Table';

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(async () => {

        const req = await fetch("http://localhost:3000/employees");
        const data = await req.json();

        setEmployees(data);

    }, [])

    return (
        <div>

            <Table striped bordered hover>
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
    )

}

export default Employees;
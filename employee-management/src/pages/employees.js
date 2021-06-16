import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Employees = () => {

    const [employees, setEmployees] = useState([]);
    const dispatch = useDispatch();


    useEffect(async () => {
        getEmployees();
    }, [])

    const getEmployees = async () => {
        let data = await api.get('/')
            .then(({ data }) => data);

        dispatch({
            type: 'INIT',
            payload: data
        });

        setEmployees(data);

    }

    return (
        <div>
            <h2 align="left">Employees</h2>
            <hr />
            <br />
            <div style={{ backgroundColor: 'white', fontSize: '18px', fontFamily: 'arial', textAlign: 'center', boxShadow: '0px 5px 19px 3px #888888' }}>
                <Table>
                    <thead style={{ color: 'darkgray' }}>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {employees.map(employee =>

                            <EmployeeCard
                                firstname={employee.firstname}
                                lastname={employee.lastname}
                                phone={employee.phone}
                                address={employee.address}
                                role={employee.role}
                                startDate={employee.startDate}
                                isEditable={false} />
                        )}

                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default Employees;
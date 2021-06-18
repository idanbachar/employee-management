import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck'

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

        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }

        let data = await api.get('/', config)
            .then(({ data }) => data);

        dispatch({
            type: 'INIT',
            payload: data
        });

        setEmployees(data);

    }

    return (
        <div>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h2>Employees</h2>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-12">
                        <CardDeck>
                            {employees.map(employee =>
                                <EmployeeCard
                                    key={employee.id}
                                    id={employee.id}
                                    firstname={employee.firstname}
                                    lastname={employee.lastname}
                                    phone={employee.phone}
                                    address={employee.address}
                                    role={employee.role}
                                    startDate={employee.startDate}
                                    isEditable={false}
                                />
                            )}
                        </CardDeck>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )

}

export default Employees;
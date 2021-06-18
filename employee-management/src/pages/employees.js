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

    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    }, [])

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
            {
                !isMobile ?
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <h2>Employees</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div style={{ backgroundColor: 'white' }}>
                                    <Table >
                                        <thead>
                                            <tr style={{ color: 'gray' }}>
                                                <th></th>
                                                <th>First name</th>
                                                <th>Last name</th>
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
                        </div>
                    </div> :
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
            }

            <br />
        </div>
    )

}

export default Employees;
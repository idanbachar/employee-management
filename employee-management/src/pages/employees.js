import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import EmployeeCard from '../components/Employee/EmployeeCard/EmployeeCard';
import { useDispatch } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck'

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Employees = () => {

    // config object with received access token:
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }

    // state of employees:
    const [employees, setEmployees] = useState([]);

    // state of indication of is mobile resolution:
    const [isMobile, setIsMobile] = useState(false);

    // handles indication of is mobile state
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {

        // listen to screen resolution change and calls handle resize function:
        window.addEventListener("resize", handleResize)

    }, [])

    useEffect(async () => {

        // get employees data from server when page renders on first time:
        getEmployees();

    }, [])


    // redux dispatch:
    const dispatch = useDispatch();

    // get employees data from server:
    const getEmployees = async () => {

        // get employees data from server using config auth:
        let data = await api.get('/', config)
            .then(({ data }) => data);

        // update state of employees with received employees:
        setEmployees(data);

        // dispatch redux global state of employees with received employees:
        dispatch({
            type: 'INIT',
            payload: data
        });
    }

    return (
        <div>
            <br />
            {           /*   2 displays: for computer and mobile     */
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
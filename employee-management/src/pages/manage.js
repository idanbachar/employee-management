import React, { useEffect, useState } from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddEmployee from '../components/Employee/AddEmployee/AddEmployee';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button'
import EmployeeCard from '../components/Employee/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck'

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Manage = () => {

    // config object with received access token:
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }

    const isMobileRedux = useSelector(state => state.isMobile);

    // state of indication of is mobile resolution:
    const [isMobile, setIsMobile] = useState(isMobileRedux);

    // state of employees:
    const [employees, setEmployees] = useState([]);

    // state of add employee modal show:
    const [addEmployeeModalShow, setEmployeeModalShow] = useState(false);

    // handles indication of is mobile state
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
            dispatch({
                type: 'Mobile'
            })

            sessionStorage.setItem("isMobile", "true");
        } else {
            setIsMobile(false);
            dispatch({
                type: 'Computer'
            })

            sessionStorage.setItem("isMobile", "false");
        }
    }

    useEffect(() => {

        // listen to screen resolution change and calls handle resize function:
        window.addEventListener("resize", handleResize);

    })

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
        })
    }

    // receives employee id and delete it from server
    const deleteEmployee = async (id) => {

        // send delete request to server with received employee's id and auth config:
        let data = await api.delete(`/${id}`, config);

        // get updated employees data after delete from server:
        getEmployees();
    }

    // receives employee object and add it to server 
    const addEmployee = async (employee) => {

        // request object with generated id using uuidv4, and received employee object:
        const request = {
            id: uuidv4(),
            ...employee
        };

        // start post request with employee data with config auth:
        const response = await api.post(`/`, request, config);

        // get employees and update with new one:
        let updatedEmployees = [...employees];
        updatedEmployees.push(response.data);

        // update state of employees with new employee:
        setEmployees(updatedEmployees);

        // dispatch redux global state of employees with new employee:
        dispatch({
            type: 'ADD',
            payload: updatedEmployees
        })

        // close add employee modal:
        setEmployeeModalShow(false);
        handleResize();
    }
    return (
        <div>
            <br />
            {           /*   2 displays: for computer and mobile     */
                sessionStorage.getItem("isMobile") === "false" ?
                    <div class="container">
                        <div class="row">
                            <div class="col-md-10">
                                <h2>Managing Employees</h2>
                            </div>
                            <div class="col-md-2">
                                <Button variant="primary" onClick={() => setEmployeeModalShow(true)}>
                                    + Add Employee
                                </Button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10"></div>
                            <div class="col-md-2">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div style={{ backgroundColor: 'white' }}>
                                    <Table>
                                        <thead>
                                            <tr style={{ color: 'gray' }}>
                                                <th></th>
                                                <th>First name</th>
                                                <th>Last name</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Role</th>
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
                                                    role={employee.role}
                                                    startDate={employee.startDate}
                                                    isEditable={true}
                                                    deleteHandler={() => deleteEmployee(employee.id)}
                                                    getUpdatedEmployees={getEmployees}
                                                />
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
                                <h2>Managing Employees</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10"></div>
                            <div class="col-md-2">
                                <Button variant="primary" onClick={() => setEmployeeModalShow(true)}>
                                    +
                                </Button>
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
                                            isEditable={true}
                                            deleteHandler={() => deleteEmployee(employee.id)}
                                            getUpdatedEmployees={getEmployees}
                                        />
                                    )}
                                </CardDeck>
                            </div>
                        </div>
                    </div>
            }
            <AddEmployee addEmployee={addEmployee} show={addEmployeeModalShow} onHide={() => setEmployeeModalShow(false)} />
            <br />
        </div>
    )
}

export default Manage;
import React, { useEffect, useState } from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddEmployee from '../components/AddEmployee/addEmployee';
import EditEmployee from '../components/EditEmployee/editEmployee';
import { v4 as uuidv4 } from 'uuid';
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck'

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const Manage = () => {

    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }

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


    const [employees, setEmployees] = useState([]);
    const employeeReducerState = useSelector(state => state.employee);
    const dispatch = useDispatch();

    const [addEmployeeModalShow, setEmployeeModalShow] = useState(false);
    const [editEmployeeModalShow, setEditEmployeeModalShow] = useState(false);

    useEffect(async () => {
        getEmployees();

    }, [])

    const getEmployees = async () => {

        let data = await api.get('/', config)
            .then(({ data }) => data);

        setEmployees(data);
        dispatch({
            type: 'INIT',
            payload: data
        })
    }

    const deleteEmployee = async (id) => {
        let data = await api.delete(`/${id}`, config);
        getEmployees();
    }

    const addEmployee = async (employee) => {
        const request = {
            id: uuidv4(),
            ...employee
        };

        const response = await api.post(`/`, request, config);
        let updatedEmployees = [...employees];
        updatedEmployees.push(response.data);
        setEmployees(updatedEmployees);
        dispatch({
            type: 'ADD',
            payload: updatedEmployees
        })
        setEmployeeModalShow(false);
        handleResize();
    }


    return (
        <div>
            <br />
            {
                !isMobile ?
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
                                    + Add Employee
                                </Button>
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
                                                    firstname={employee.firstname}
                                                    lastname={employee.lastname}
                                                    phone={employee.phone}
                                                    address={employee.address}
                                                    role={employee.role}
                                                    startDate={employee.startDate}
                                                    isEditable={true}
                                                    deleteHandler={() => deleteEmployee(employee.id)} />
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
                                    + Add Employee
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
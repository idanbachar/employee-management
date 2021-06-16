import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Register = () => {

    const formLabelStyle = {
        margin: 'auto',
        color: 'blue'
    }

    const formControlStyle = {
        width: '60%',
        margin: 'auto'
    }

    return (
        <div>
            <h2 align="left">Register</h2>

            <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <h4>Personal Details</h4>
                        <br />
                        <Form >
                            <Form.Group controlId="formBasicFirstname">
                                <Form.Label style={formLabelStyle}>Firstname:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter firstname" />
                            </Form.Group>
                            <Form.Group controlId="formBasicLastname">
                                <Form.Label style={formLabelStyle}>Lastname:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter lastname" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>Email:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="30" type="email" placeholder="Enter email" />
                            </Form.Group>
                            <hr />
                            <h4>Password</h4>
                            <br />
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicRetypePassword">
                                <Form.Label style={formLabelStyle}>Retype Password:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password again" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
            <br />
            Have an account? Sign In.
        </div>
    )

}

export default Register;
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Register from '../pages/register';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValidation, setEmailnameValidation] = useState(null);
    const [passwordValidation, setPasswordnameValidation] = useState(null);

    const formLabelStyle = {
        margin: 'auto',
        color: 'blue'
    }

    const formControlStyle = {
        width: '60%',
        margin: 'auto'
    }
    const validateFields = () => {

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        return (isEmailValid &&
            isPasswordValid
        );
    }

    const validateEmail = () => {

        if (email.length === 0) {
            setEmailnameValidation("Email can not be empty.")
            return false;
        }
        else if (email.length < 12) {
            setEmailnameValidation("Email must have atleast 12 letters.");
            return false;
        }
        else if (!email.includes("@")) {
            setEmailnameValidation("Email must have '@'.");
            return false;
        }
        else if (!email.includes(".com")) {
            setEmailnameValidation("Email must have '.com'.");
            return false;
        }
        else if (email.split('@').length > 2) {
            setEmailnameValidation("Email must have only 1 '@'.");
            return false;
        }
        else if (email.indexOf(".com") < email.length - 4) {
            setEmailnameValidation("'.com' must be at the end of the email.");
            return false;
        }

        setEmailnameValidation(null);
        return true;
    }

    const validatePassword = () => {

        if (password.length === 0) {
            setPasswordnameValidation("Password can not be empty.")
            return false;
        }
        else if (password.length < 6) {
            setPasswordnameValidation("Password must have atleast 6 letters.");
            return false;
        }


        setPasswordnameValidation(null);
        return true;
    }

    return (
        <div>
            <h2 align="left">Login</h2>

            <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <h4>Personal Details</h4>
                        <br />
                        <Form >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>Email:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="30" type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                                <div><font color="red">{emailValidation}</font></div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                                <div><font color="red">{passwordValidation}</font></div>
                            </Form.Group>
                            <Button onClick={() => validateFields()} variant="primary">
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
            <br />
            <Router>
                Don't have an account? <Link to="/register">Sign Up</Link>.

            </Router>

        </div>
    )

}

export default Login;
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Toast from 'react-bootstrap/Toast'

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'


const api = axios.create({
    baseURL: `http://localhost:8000/auth/login`
})


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

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

        if (isEmailValid && isPasswordValid)
            login();

    }

    const login = () => {

        const data = {
            email: email,
            password: password
        }

        api.post(`/`, data).then(res => {

            localStorage.setItem("isLogin", JSON.stringify(data));
            window.location.href = "/manage";

            console.log(res);
        }).catch(err => {
            setPasswordValidation("Invalid email or password.");
            console.log(err);
        })

    }

    const validateEmail = () => {

        if (email.length === 0) {
            setEmailValidation("Email can not be empty.")
            return false;
        }
        else if (email.length < 12) {
            setEmailValidation("Email must have atleast 12 letters.");
            return false;
        }
        else if (!email.includes("@")) {
            setEmailValidation("Email must have '@'.");
            return false;
        }
        else if (!email.includes(".com")) {
            setEmailValidation("Email must have '.com'.");
            return false;
        }
        else if (email.split('@').length > 2) {
            setEmailValidation("Email must have only 1 '@'.");
            return false;
        }
        else if (email.indexOf(".com") < email.length - 4) {
            setEmailValidation("'.com' must be at the end of the email.");
            return false;
        }

        setEmailValidation(null);
        return true;
    }

    const validatePassword = () => {

        if (password.length === 0) {
            setPasswordValidation("Password can not be empty.")
            return false;
        }
        else if (password.length < 6) {
            setPasswordValidation("Password must have atleast 6 letters.");
            return false;
        }

        setPasswordValidation(null);
        return true;
    }

    return (

        <div>
            <Route>
                {localStorage.getItem("isLogin") !== null ?
                    <Redirect to="/manage" /> :
                    null}
            </Route>
            <h2 align="left">Login</h2>
            <hr />
            <br />
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

            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'relative',
                    minHeight: '200px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    <Toast autohide="true" show={showA} onClose={toggleShowA}>
                        <Toast.Header>
                            <strong className="mr-auto">Message</strong>
                            <small>1 sec ago</small>
                        </Toast.Header>
                        <Toast.Body>Login has been succeed!</Toast.Body>
                    </Toast>
                </div>
            </div>
        </div>
    )

}

export default Login;
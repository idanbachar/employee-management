import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { SegmentedNav } from 'react-bootstrap-icons';
import { validate } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'

const api = axios.create({
    baseURL: `http://localhost:8000/auth/register`
})

const Register = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const [firstnameValidation, setFirstnameValidation] = useState(null);
    const [lastnameValidation, setLastnameValidation] = useState(null);
    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);
    const [repasswordValidation, setRepasswordValidation] = useState(null);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const formLabelStyle = {
        margin: 'auto',
        color: 'blue'
    }

    const formControlStyle = {
        width: '60%',
        margin: 'auto'
    }

    const validateFields = (e) => {

        e.preventDefault();

        const isFirstNameValid = validateFirstname();
        const isLastNameValid = validateLastname();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isRepasswordValid = validateRepassword();

        if (isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isRepasswordValid) {
            register();
        }
    }

    const validateFirstname = () => {

        if (firstname.length === 0) {
            setFirstnameValidation("Firstname can not be empty.")
            return false;
        }
        else if (firstname.length === 1) {
            setFirstnameValidation("Firstname must have atleast 2 letters.");
            return false;
        }
        else if (isContainsNumber(firstname)) {
            setFirstnameValidation("Firstname can not contain numbers.");
            return false;
        }

        setFirstnameValidation(null);
        return true;
    }

    const validateLastname = () => {

        if (lastname.length === 0) {
            setLastnameValidation("Lastname can not be empty.")
            return false;
        }
        else if (lastname.length === 1) {
            setLastnameValidation("Lastname must have atleast 2 letters.");
            return false;
        }
        else if (isContainsNumber(lastname)) {
            setLastnameValidation("Lastname can not contain numbers.");
            return false;
        }

        setLastnameValidation(null);
        return true;
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
        else if (!isContainsNumber(password)) {
            setPasswordValidation("Password must contain numbers.");
            return false;
        }
        else if (!isContainsLetter(password)) {
            setPasswordValidation("Password must contain letters.");
            return false;
        }

        setPasswordValidation(null);
        return true;
    }

    const validateRepassword = () => {

        if (repassword.length === 0) {
            setRepasswordValidation("Repassword can not be empty.")
            return false;
        }
        else if (repassword.length < 6) {
            setRepasswordValidation("Repassword must have atleast 6 letters.");
            return false;
        }
        else if (!isContainsNumber(repassword)) {
            setRepasswordValidation("Repassword must contain numbers.");
            return false;
        }
        else if (!isContainsLetter(repassword)) {
            setRepasswordValidation("Repassword must contain letters.");
            return false;
        }

        if (repassword !== password) {
            setRepasswordValidation("Repassword must be equal to password.");
            return false;
        }

        setRepasswordValidation(null);
        return true;
    }


    const isContainsNumber = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                return true;
        }

        return false;
    }

    const isContainsLetter = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (isNaN(value.charAt(i)))
                return true;
        }

        return false;
    }

    const register = async () => {

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password

        };

        api.post(`/`, data).then(res => {
            dispatch({
                type: 'INIT',
                payload: data
            })

            console.log(res);

        }).catch(err => {
            setEmailValidation("Current email is being used by other user.");
        });
    }

    return (
        <div>
            <Route>
                {user !== null ?

                    <Redirect to="/manage" /> :

                    null
                }
            </Route>
            <h2 align="left">Register</h2>
            <hr />
            <br />
            <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <h4>Personal Details</h4>
                        <br />
                        <Form >
                            <Form.Group controlId="formBasicFirstname">
                                <Form.Label style={formLabelStyle}>Firstname:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter firstname" onChange={(e) => { setFirstname(e.target.value) }} />
                                <div><font color="red">{firstnameValidation}</font></div>
                            </Form.Group>
                            <Form.Group controlId="formBasicLastname">
                                <Form.Label style={formLabelStyle}>Lastname:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter lastname" onChange={(e) => { setLastName(e.target.value) }} />
                                <div><font color="red">{lastnameValidation}</font></div>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>Email:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="30" type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                                <div><font color="red">{emailValidation}</font></div>
                            </Form.Group>
                            <hr />
                            <h4>Password</h4>
                            <br />
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>Password:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                                <div><font color="red">{passwordValidation}</font></div>
                            </Form.Group>
                            <Form.Group controlId="formBasicRetypePassword">
                                <Form.Label style={formLabelStyle}>Retype Password:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password again" onChange={(e) => { setRepassword(e.target.value) }} />
                                <div><font color="red">{repasswordValidation}</font></div>
                            </Form.Group>

                            <Button variant="primary" onClick={validateFields}>
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
            <br />
        </div >
    )

}

export default Register;
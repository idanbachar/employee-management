import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Toast from 'react-bootstrap/Toast'
import Select from 'react-select';
import FormLanguages from '../Languages/FormLanguages';

import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

const api = axios.create({
    baseURL: `http://localhost:8000/auth/login`
})


const Login = () => {

    const defaultLanguage = "EN";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);

    const [language, setLanguage] = useState(defaultLanguage);

    const [title, setTitle] = useState(FormLanguages.Labels.Title[language]);
    const [mainLabel, setMainLabel] = useState(FormLanguages.Labels.Main[language]);
    const [emailFieldLabel, setEmailFieldLabel] = useState(FormLanguages.Labels.Fields[language][0].message);
    const [passwordFieldLabel, setPasswordFieldLabel] = useState(FormLanguages.Labels.Fields[language][1].message);
    const [submitButtonLabel, setSubmitButtonLabel] = useState(FormLanguages.Labels.Submit[language]);

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const languages = [
        { label: 'EN', value: 'EN' },
        { label: 'HE', value: 'HE' }
    ]

    const formLabelStyle = {
        margin: 'auto',
        color: 'blue'
    }

    const formControlStyle = {
        width: '60%',
        margin: 'auto'
    }
    const validateFields = (isFlag) => {

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isFlag) {
            if (isEmailValid && isPasswordValid)
                handleLogin();
        }
    }

    const handleLogin = () => {

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

            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][0].message)
            return false;
        }
        else if (email.length < 12) {
            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][1].message)
            return false;
        }
        else if (!email.includes("@")) {
            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][2].message)
            return false;
        }
        else if (!email.includes(".com")) {
            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][3].message)
            return false;
        }
        else if (email.split('@').length > 2) {
            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][4].message)
            return false;
        }
        else if (email.indexOf(".com") < email.length - 4) {
            setEmailValidation(FormLanguages.validationErrors.inputs.email[language][5].message)
            return false;
        }

        setEmailValidation(null);
        return true;
    }

    const validatePassword = () => {

        if (password.length === 0) {
            setPasswordValidation(FormLanguages.validationErrors.inputs.password[language][0].message)
            return false;
        }
        else if (password.length < 6) {
            setPasswordValidation(FormLanguages.validationErrors.inputs.password[language][1].message);
            return false;
        }

        setPasswordValidation(null);
        return true;
    }

    const changeLanguage = () => {
        setTitle(FormLanguages.Labels.Title[language]);
        setMainLabel(FormLanguages.Labels.Main[language]);
        setEmailFieldLabel(FormLanguages.Labels.Fields[language][0].message);
        setPasswordFieldLabel(FormLanguages.Labels.Fields[language][1].message);
        setSubmitButtonLabel(FormLanguages.Labels.Submit[language]);

        validateFields(false);
    }

    return (

        <div>
            <Route>
                {localStorage.getItem("isLogin") !== null ?
                    <Redirect to="/manage" /> :
                    null}
            </Route>
            <h2 align="left">{title}</h2>
            <hr />
            <div>
                <table width="200">
                    <tr>
                        <td>
                            <Select
                                label="Select language"
                                options={languages}
                                defaultValue={languages[0]}
                                onChange={(e) => setLanguage(e.value)}
                            />
                        </td>
                        <td>
                            <Button onClick={changeLanguage}>
                                Update
                            </Button>
                        </td>
                    </tr>
                </table>
            </div>

            <br />
            <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                <Card style={{ width: '40rem' }}>
                    <Card.Body>
                        <h4>{mainLabel}</h4>
                        <br />
                        <Form >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label style={formLabelStyle}>{emailFieldLabel}:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="30" type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                                <div><font color="red">{emailValidation}</font></div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label style={formLabelStyle}>{passwordFieldLabel}:</Form.Label>
                                <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                                <div><font color="red">{passwordValidation}</font></div>
                            </Form.Group>
                            <Button onClick={() => validateFields(true)} variant="primary">
                                {submitButtonLabel}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
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
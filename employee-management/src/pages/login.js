import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Toast from 'react-bootstrap/Toast'
import Select from 'react-select';
import FormLanguages from '../Languages/FormLanguages';
import { useMediaQuery } from 'react-responsive';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom'


const api = axios.create({
    baseURL: `http://localhost:3000/`
})

const Login = () => {

    const defaultLanguage = "EN";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);

    const [language, setLanguage] = useState(defaultLanguage);

    const [title, setTitle] = useState(FormLanguages.login.labels.title[language]);
    const [mainLabel, setMainLabel] = useState(FormLanguages.login.labels.main[language]);
    const [emailFieldLabel, setEmailFieldLabel] = useState(FormLanguages.login.labels.fields[language][0].message);
    const [passwordFieldLabel, setPasswordFieldLabel] = useState(FormLanguages.login.labels.fields[language][1].message);
    const [submitButtonLabel, setSubmitButtonLabel] = useState(FormLanguages.login.labels.submit[language]);

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
    const validateFields = (isFlag, lang) => {

        const isEmailValid = validateEmail(lang);
        const isPasswordValid = validatePassword(lang);

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

        api.post(`/auth/login`, data).then(res => {

            localStorage.setItem("isLogin", JSON.stringify(data));
            const access_token = res.data.access_token;
            localStorage.setItem('token', access_token);

            console.log(res);

            const config = {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            }

            api.get(`/users?email=${email}`, config).then(result => {

                const userData = result.data[0];
                localStorage.setItem("userData", JSON.stringify(userData));
                console.log(userData);

                window.location.href = "/manage";

            }).catch(error => {
                console.log(error);
            })

        }).catch(err => {
            setPasswordValidation("Invalid email or password.");
            console.log(err);
        })

    }

    const validateEmail = (lang) => {

        if (email.length === 0) {

            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][0].message)
            return false;
        }
        else if (email.length < 12) {
            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][1].message)
            return false;
        }
        else if (!email.includes("@")) {
            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][2].message)
            return false;
        }
        else if (!email.includes(".com")) {
            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][3].message)
            return false;
        }
        else if (email.split('@').length > 2) {
            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][4].message)
            return false;
        }
        else if (email.indexOf(".com") < email.length - 4) {
            setEmailValidation(FormLanguages.login.validationErrors.inputs.email[lang][5].message)
            return false;
        }

        setEmailValidation(null);
        return true;
    }

    const validatePassword = (lang) => {

        if (password.length === 0) {
            setPasswordValidation(FormLanguages.login.validationErrors.inputs.password[lang][0].message)
            return false;
        }
        else if (password.length < 6) {
            setPasswordValidation(FormLanguages.login.validationErrors.inputs.password[lang][1].message);
            return false;
        }

        setPasswordValidation(null);
        return true;
    }

    const changeLanguage = (lang) => {

        setTitle(FormLanguages.login.labels.title[lang]);
        setMainLabel(FormLanguages.login.labels.main[lang]);
        setEmailFieldLabel(FormLanguages.login.labels.fields[lang][0].message);
        setPasswordFieldLabel(FormLanguages.login.labels.fields[lang][1].message);
        setSubmitButtonLabel(FormLanguages.login.labels.submit[lang]);
        setLanguage(lang);

        validateFields(false, lang);
    }

    return (

        <div>
            <Route>
                {localStorage.getItem("isLogin") !== null ?
                    <Redirect to="/manage" /> :
                    null}
            </Route>
            <br />
            <div class="container">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-3">
                        <h2>{title}</h2>
                        <br />
                    </div>

                </div>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-2">
                        <Select
                            label="Select language"
                            options={languages}
                            defaultValue={languages[0]}
                            onChange={(e) => changeLanguage(e.value)}
                        />
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                            <Card>
                                <Card.Body>
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
                                        <Button onClick={() => validateFields(true, language)} variant="primary">
                                            {submitButtonLabel}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                        <br />
                        <Route>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </Route>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;
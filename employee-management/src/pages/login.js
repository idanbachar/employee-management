import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Select from 'react-select';
import FormLanguages from '../Languages/FormLanguages';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'


const api = axios.create({
    baseURL: `http://localhost:3000/`
})

const Login = () => {

    // default language:
    const defaultLanguage = "EN";

    // form fields states:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // form fields validation states:
    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);

    // language state:
    const [language, setLanguage] = useState(defaultLanguage);

    // elements language states:
    const [title, setTitle] = useState(FormLanguages.login.labels.title[language]);
    const [mainLabel, setMainLabel] = useState(FormLanguages.login.labels.main[language]);
    const [emailFieldLabel, setEmailFieldLabel] = useState(FormLanguages.login.labels.fields[language][0].message);
    const [passwordFieldLabel, setPasswordFieldLabel] = useState(FormLanguages.login.labels.fields[language][1].message);
    const [submitButtonLabel, setSubmitButtonLabel] = useState(FormLanguages.login.labels.submit[language]);

    // available languages:
    const languages = [
        { label: 'EN', value: 'EN' },
        { label: 'HE', value: 'HE' }
    ]

    // form label css style:
    const formLabelStyle = {
        margin: 'auto',
        color: 'blue'
    }

    // form control css style:
    const formControlStyle = {
        width: '60%',
        margin: 'auto'
    }


    // receives isFlag = (if true start validation and handle login), and language
    // updates validation language and handles login
    const validateFields = (isFlag, lang) => {

        const isEmailValid = validateEmail(lang);
        const isPasswordValid = validatePassword(lang);

        if (isFlag) {
            if (isEmailValid && isPasswordValid)
                handleLogin();
        }
    }

    // handles login. sends entered email, password and try login
    const handleLogin = () => {

        // login data to send:
        const data = {
            email: email, password: password
        }

        // start post request with data auth:
        api.post(`/auth/login`, data).then(res => {

            // save 'isLogin' item in local storage:
            localStorage.setItem("isLogin", JSON.stringify(data));

            // when post success, receive access token and save it on local storage:
            const access_token = res.data.access_token;
            localStorage.setItem('token', access_token);

            console.log(res);

            // config object with received access token:
            const config = {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            }

            // send get request to receive current user
            api.get(`/users?email=${email}`, config).then(result => {

                // get user's data (firstname, lastname):
                const userData = result.data[0];

                // set data in local storage:
                localStorage.setItem("userData", JSON.stringify(userData));
                console.log(userData);

                // redirect user to manage page:
                window.location.href = "/manage";

            }).catch(error => {
                console.log(error);
            })

        }).catch(err => {
            setPasswordValidation("Invalid email or password.");
            console.log(err);
        })

    }

    // validation for email with received language as parameter
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

    // validation for password with received language as parameter
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

    // receives language and set form labels with received language
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
import React, { useEffect, useState } from 'react';
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

const Register = () => {

    // default language:
    const defaultLanguage = "EN";

    // form fields states:
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    // form fields validation states:
    const [firstnameValidation, setFirstnameValidation] = useState(null);
    const [lastnameValidation, setLastnameValidation] = useState(null);
    const [emailValidation, setEmailValidation] = useState(null);
    const [passwordValidation, setPasswordValidation] = useState(null);
    const [repasswordValidation, setRepasswordValidation] = useState(null);

    // language state:
    const [language, setLanguage] = useState(defaultLanguage);

    // elements language states:
    const [title, setTitle] = useState(FormLanguages.register.labels.title[language]);
    const [mainLabel, setMainLabel] = useState(FormLanguages.register.labels.main[language]);
    const [firstnameFieldLabel, setFirstnameFieldLabel] = useState(FormLanguages.register.labels.fields[language][0].message);
    const [lastnameFieldLabel, setLastnameFieldLabel] = useState(FormLanguages.register.labels.fields[language][1].message);
    const [emailFieldLabel, setEmailFieldLabel] = useState(FormLanguages.register.labels.fields[language][2].message);
    const [passwordFieldLabel, setPasswordFieldLabel] = useState(FormLanguages.register.labels.fields[language][3].message);
    const [rePasswordFieldLabel, setRePasswordFieldLabel] = useState(FormLanguages.register.labels.fields[language][4].message);
    const [submitButtonLabel, setSubmitButtonLabel] = useState(FormLanguages.register.labels.submit[language]);

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

    // handles indication of is mobile state
    const handleResize = () => {
        if (window.innerWidth < 720) {
            sessionStorage.setItem("isMobile", "true");

        } else {
            sessionStorage.setItem("isMobile", "false");
        }
    }

    useEffect(() => {

        handleResize();

        // listen to screen resolution change and calls handle resize function:
        window.addEventListener("resize", handleResize);

    })

    // receives isFlag = (if true start validation and handle register), and language
    // updates validation language and handles register
    const validateFields = (isFlag, lang) => {

        const isFirstNameValid = validateFirstname(lang);
        const isLastNameValid = validateLastname(lang);
        const isEmailValid = validateEmail(lang);
        const isPasswordValid = validatePassword(lang);
        const isRepasswordValid = validateRepassword(lang);

        if (isFlag) {
            if (isFirstNameValid &&
                isLastNameValid &&
                isEmailValid &&
                isPasswordValid &&
                isRepasswordValid) {
                handleRegister();
            }
        }
    }

    // handles register. sends entered firstname, lastname, email, password and try register
    const handleRegister = async () => {

        // register data to send:
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password

        };

        // start post request with data auth:
        api.post(`/auth/register`, data).then(res => {

            // when post success, receive access token:
            const access_token = res.data.access_token;

            // config object with received access token:
            const config = {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            }

            console.log(res);

            // send post request to add created user with his personal details (firstname, lastname):
            api.post(`/users`, data, config).then(result => {

                console.log(result);
                window.location.href = "/login";
            }).catch(error => {
                console.log(error);
            })

        }).catch(err => {
            setEmailValidation("Current email is being used by other user.");
        });
    }

    // validation for firstname with received language as parameter
    const validateFirstname = (lang) => {

        if (firstname.length === 0) {
            setFirstnameValidation(FormLanguages.register.validationErrors.inputs.firstname[lang][0].message);
            return false;
        }
        else if (firstname.length === 1) {
            setFirstnameValidation(FormLanguages.register.validationErrors.inputs.firstname[lang][1].message);
            return false;
        }
        else if (isContainsNumber(firstname)) {
            setFirstnameValidation(FormLanguages.register.validationErrors.inputs.firstname[lang][2].message);
            return false;
        }

        setFirstnameValidation(null);
        return true;
    }

    // validation for lastname with received language as parameter
    const validateLastname = (lang) => {

        if (lastname.length === 0) {
            setLastnameValidation(FormLanguages.register.validationErrors.inputs.lastname[lang][0].message);
            return false;
        }
        else if (lastname.length === 1) {
            setLastnameValidation(FormLanguages.register.validationErrors.inputs.lastname[lang][1].message);
            return false;
        }
        else if (isContainsNumber(lastname)) {
            setLastnameValidation(FormLanguages.register.validationErrors.inputs.lastname[lang][2].message);
            return false;
        }

        setLastnameValidation(null);
        return true;
    }

    // validation for email with received language as parameter
    const validateEmail = (lang) => {

        if (email.length === 0) {

            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][0].message);
            return false;
        }
        else if (email.length < 12) {
            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][1].message);
            return false;
        }
        else if (!email.includes("@")) {
            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][2].message);
            return false;
        }
        else if (!email.includes(".com")) {
            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][3].message);
            return false;
        }
        else if (email.split('@').length > 2) {
            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][4].message);
            return false;
        }
        else if (email.indexOf(".com") < email.length - 4) {
            setEmailValidation(FormLanguages.register.validationErrors.inputs.email[lang][5].message);
            return false;
        }

        setEmailValidation(null);
        return true;
    }

    // validation for password with received language as parameter
    const validatePassword = (lang) => {

        if (password.length === 0) {
            setPasswordValidation(FormLanguages.register.validationErrors.inputs.password[lang][0].message);
            return false;
        }
        else if (password.length < 6) {
            setPasswordValidation(FormLanguages.register.validationErrors.inputs.password[lang][1].message);
            return false;
        }
        else if (!isContainsNumber(password)) {
            setPasswordValidation(FormLanguages.register.validationErrors.inputs.password[lang][2].message);
            return false;
        }
        else if (!isContainsLetter(password)) {
            setPasswordValidation(FormLanguages.register.validationErrors.inputs.password[lang][3].message);
            return false;
        }

        setPasswordValidation(null);
        return true;
    }

    // validation for repassword with received language as parameter
    const validateRepassword = (lang) => {

        if (repassword.length === 0) {
            setRepasswordValidation(FormLanguages.register.validationErrors.inputs.repassword[lang][0].message);
            return false;
        }
        else if (repassword.length < 6) {
            setRepasswordValidation(FormLanguages.register.validationErrors.inputs.repassword[lang][1].message);
            return false;
        }
        else if (!isContainsNumber(repassword)) {
            setRepasswordValidation(FormLanguages.register.validationErrors.inputs.repassword[lang][2].message);
            return false;
        }
        else if (!isContainsLetter(repassword)) {
            setRepasswordValidation(FormLanguages.register.validationErrors.inputs.repassword[lang][3].message);
            return false;
        }

        if (repassword !== password) {
            setRepasswordValidation(FormLanguages.register.validationErrors.inputs.repassword[lang][4].message);
            return false;
        }

        setRepasswordValidation(null);
        return true;
    }

    // receives language and set form labels with received language
    const changeLanguage = (lang) => {

        setTitle(FormLanguages.register.labels.title[lang]);
        setMainLabel(FormLanguages.register.labels.main[lang]);
        setFirstnameFieldLabel(FormLanguages.register.labels.fields[lang][0].message);
        setLastnameFieldLabel(FormLanguages.register.labels.fields[lang][1].message);
        setEmailFieldLabel(FormLanguages.register.labels.fields[lang][2].message);
        setPasswordFieldLabel(FormLanguages.register.labels.fields[lang][3].message);
        setRePasswordFieldLabel(FormLanguages.register.labels.fields[lang][4].message);
        setSubmitButtonLabel(FormLanguages.register.labels.submit[lang]);
        setLanguage(lang);

        validateFields(false, lang);
    }

    // receives a string and returns true if contains numbers
    const isContainsNumber = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                return true;
        }

        return false;
    }

    // receives a string and returns true if contains letters
    const isContainsLetter = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (isNaN(value.charAt(i)))
                return true;
        }

        return false;
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
                            <Card >
                                <Card.Body>
                                    <h4>{mainLabel}</h4>
                                    <br />
                                    <Form >
                                        <Form.Group controlId="formBasicFirstname">
                                            <Form.Label style={formLabelStyle}>{firstnameFieldLabel}:</Form.Label>
                                            <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter firstname" onChange={(e) => { setFirstname(e.target.value) }} />
                                            <div><font color="red">{firstnameValidation}</font></div>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicLastname">
                                            <Form.Label style={formLabelStyle}>{lastnameFieldLabel}:</Form.Label>
                                            <Form.Control style={formControlStyle} maxLength="15" type="text" placeholder="Enter lastname" onChange={(e) => { setLastName(e.target.value) }} />
                                            <div><font color="red">{lastnameValidation}</font></div>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label style={formLabelStyle}>{emailFieldLabel}:</Form.Label>
                                            <Form.Control style={formControlStyle} maxLength="30" type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }} />
                                            <div><font color="red">{emailValidation}</font></div>
                                        </Form.Group>
                                        <hr />
                                        <h4>Password</h4>
                                        <br />
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label style={formLabelStyle}>{passwordFieldLabel}:</Form.Label>
                                            <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} />
                                            <div><font color="red">{passwordValidation}</font></div>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicRetypePassword">
                                            <Form.Label style={formLabelStyle}>{rePasswordFieldLabel}:</Form.Label>
                                            <Form.Control style={formControlStyle} maxLength="12" type="password" placeholder="Enter password again" onChange={(e) => { setRepassword(e.target.value) }} />
                                            <div><font color="red">{repasswordValidation}</font></div>
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => validateFields(true, language)}>
                                            {submitButtonLabel}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                        <br />
                        <Route>
                            Have an account? <Link to="/login">Sign In</Link>
                        </Route>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
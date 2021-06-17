import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import Select from 'react-select';
import FormLanguages from '../Languages/FormLanguages';

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

    const defaultLanguage = "EN";

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

    const [language, setLanguage] = useState(defaultLanguage);

    const [title, setTitle] = useState(FormLanguages.register.labels.title[language]);
    const [mainLabel, setMainLabel] = useState(FormLanguages.register.labels.main[language]);

    const [firstnameFieldLabel, setFirstnameFieldLabel] = useState(FormLanguages.register.labels.fields[language][0].message);
    const [lastnameFieldLabel, setLastnameFieldLabel] = useState(FormLanguages.register.labels.fields[language][1].message);
    const [emailFieldLabel, setEmailFieldLabel] = useState(FormLanguages.register.labels.fields[language][2].message);
    const [passwordFieldLabel, setPasswordFieldLabel] = useState(FormLanguages.register.labels.fields[language][3].message);
    const [rePasswordFieldLabel, setRePasswordFieldLabel] = useState(FormLanguages.register.labels.fields[language][4].message);
    const [submitButtonLabel, setSubmitButtonLabel] = useState(FormLanguages.register.labels.submit[language]);

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

    const handleRegister = async () => {

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password

        };

        api.post(`/`, data).then(res => {

            localStorage.setItem("isLogin", JSON.stringify(data));
            window.location.href = "/manage";

            console.log(res);

        }).catch(err => {
            setEmailValidation("Current email is being used by other user.");
        });
    }

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
                <table width="100">
                    <tr>
                        <td>
                            <Select
                                label="Select language"
                                options={languages}
                                defaultValue={languages[0]}
                                onChange={(e) => changeLanguage(e.value)}
                            />
                        </td>
                    </tr>
                </table>
            </div>
            <div style={{ boxShadow: '0px 5px 19px 3px #888888' }} >
                <Card style={{ width: '40rem' }}>
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
        </div >
    )

}

export default Register;
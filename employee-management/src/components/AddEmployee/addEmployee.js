import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmployee = (props) => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const [firstnameValidation, setFirstnameValidation] = useState(null);
    const [lastnameValidation, setLastnameValidation] = useState(null);
    const [phoneValidation, setPhoneValidation] = useState(null);
    const [addressValidation, setAddressValidation] = useState(null);
    const [roleValidation, setRoleValidation] = useState(null);

    const roles = [
        { label: 'HR', value: 'HR' },
        { label: 'Programmer', value: 'Programmer' },
        { label: 'Data Analyst', value: 'Data Analyst' }
    ]

    const isContainsOnlyNumbers = (value) => {

        let digitsCount = 0;
        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                digitsCount++;
        }

        return value.length == digitsCount;
    }

    const isContainsNumber = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                return true;
        }

        return false;
    }

    const validateData = () => {

        const isFirstNameValid = validateFirstname();
        const isLastNameValid = validateLastname();
        const isPhoneValid = validatePhone();
        const isAddressValid = validateAddress();
        const isRoleValid = validateRole();

        if (isFirstNameValid &&
            isLastNameValid &&
            isPhoneValid &&
            isAddressValid &&
            isRoleValid) {

            const data = {
                "firstname": firstname,
                "lastname": lastname,
                "phone": phone,
                "address": address,
                "role": role,
                "startDate": startDate.toDateString()
            }
            props.addEmployee(data);

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

    const validatePhone = () => {

        const kidometArray = [
            "050",
            "051",
            "052",
            "053",
            "054",
            "054",
            "055",
            "056",
            "057",
            "058",
            "059"
        ];
        const phoneFirstThreeDigits = phone.substring(0, 3);


        if (phone.length === 0) {
            setPhoneValidation("Phone can not be empty.")
            return false;
        }
        else if (phone.length != 10) {
            setPhoneValidation("Phone must have 10 digits.");
            return false;
        }
        else if (!isContainsOnlyNumbers(phone)) {
            setPhoneValidation("Phone can not contain letters.");
            return false;
        }
        else if (!kidometArray.includes(phoneFirstThreeDigits)) {
            setPhoneValidation("Phone's kidomet is not valid.");
            return false;
        }

        setPhoneValidation(null);
        return true;
    }

    const validateAddress = () => {

        if (address.length === 0) {
            setAddressValidation("Address can not be empty.")
            return false;
        }
        else if (address.length < 3) {
            setAddressValidation("Address must have atleast 3 letters.");
            return false;
        }

        setAddressValidation(null);
        return true;
    }

    const validateRole = () => {

        if (role === "") {
            setRoleValidation("Role can not be empty.")
            return false;
        }

        setRoleValidation(null);
        return true;
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Employee
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} />
                            <div><font color="red">{firstnameValidation}</font></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} />
                            <div><font color="red">{lastnameValidation}</font></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" placeholder="Enter Phone Number" maxLength="10" onChange={(e) => setPhone(e.target.value)} />
                            <div><font color="red">{phoneValidation}</font></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                            <div><font color="red">{addressValidation}</font></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRoll">
                            <Form.Label>Role</Form.Label>
                            <Select
                                label="Select somthing"
                                options={roles}
                                onChange={(e) => setRole(e.value)}
                            />
                            <div><font color="red">{roleValidation}</font></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRoll">
                            <Form.Label>Start Date</Form.Label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </Form.Group>
                    </Form>


                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => validateData()}>Add</Button>
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal >
    );
}


export default AddEmployee;
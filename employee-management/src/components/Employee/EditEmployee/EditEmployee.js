import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/employees`
})

const EditEmployee = (props) => {

    // config object with received access token:
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }
    }

    // form update fields states:
    const [id, setId] = useState(props.data.id);
    const [firstname, setFirstName] = useState(props.data.firstname);
    const [lastname, setLastName] = useState(props.data.lastname);
    const [phone, setPhone] = useState(props.data.phone);
    const [address, setAddress] = useState(props.data.address);
    const [role, setRole] = useState(props.data.role);
    const [startDate, setStartDate] = useState(new Date(props.data.startDate));

    // form update fields validation states:
    const [firstnameValidation, setFirstnameValidation] = useState(null);
    const [lastnameValidation, setLastnameValidation] = useState(null);
    const [phoneValidation, setPhoneValidation] = useState(null);
    const [addressValidation, setAddressValidation] = useState(null);
    const [roleValidation, setRoleValidation] = useState(null);

    // update employee modal state:
    const [modalShow, setModalShow] = React.useState(false);

    // redux dispatch:
    const dispatch = useDispatch();

    // show delete employee dialog state:
    const [showDialog, setShowDialog] = useState(false);
    const handleClose = () => setShowDialog(false);

    // array of roles for selection:
    const roles = [
        { label: 'HR', value: 'HR' },
        { label: 'Programmer', value: 'Programmer' },
        { label: 'Data Analyst', value: 'Data Analyst' }
    ]

    // receives a string and returns true if contains only numbers
    const isContainsOnlyNumbers = (value) => {

        let digitsCount = 0;
        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                digitsCount++;
        }

        return value.length == digitsCount;
    }

    // receives a string and returns true if contains numbers
    const isContainsNumber = (value) => {

        for (let i = 0; i < value.length; i++) {
            if (!isNaN(value.charAt(i)))
                return true;
        }

        return false;
    }

    // checks validation for edit employee's fields and update employee
    const validateFields = () => {

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

            const updatedData = {
                "id": id,
                "firstname": firstname,
                "lastname": lastname,
                "phone": phone,
                "address": address,
                "role": role,
                "startDate": startDate.toDateString()
            }

            updateEmployee(updatedData);
        }
    }

    // validation for firstname
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

    // validation for lastname
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

    // validation for phone
    const validatePhone = () => {

        const phonePrefixArray = [
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
        else if (!phonePrefixArray.includes(phoneFirstThreeDigits)) {
            setPhoneValidation("Phone's prefix is not valid.");
            return false;
        }

        setPhoneValidation(null);
        return true;
    }

    // validation for address
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

    // validation for role
    const validateRole = () => {

        if (role === "") {
            setRoleValidation("Role can not be empty.")
            return false;
        }

        setRoleValidation(null);
        return true;
    }

    // receives employee and updates
    const updateEmployee = async (employee) => {

        // send put request to server with received employee's id, employee as data and auth config:
        const response = await api.put(`/${employee.id}`, employee, config);

        console.log(response);

        // dispatch redux global state of updated employee:
        dispatch({
            type: 'UPDATE',
            payload: employee
        })

        // get updated employees after employee updated:
        props.data.getUpdatedEmployees();

        // close edit employee modal:
        closeEdit();
    }

    // close edit employee modal
    const closeEdit = () => {
        setModalShow(false);
    }

    // open delete dialog
    const openDeleteDialog = () => {
        setShowDialog(true);
    }

    // delete employee
    const deleteEmployee = () => {
        props.data.deleteHandler(props.data.id)
        setShowDialog(false);
    }

    return (
        <div>
            <a onClick={() => setModalShow(true)}><PencilFill color="blue" /></a>
            |
            <a onClick={() => openDeleteDialog(true)}><TrashFill color="red" /></a>

            <Modal show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                                <div><font color="red">{firstnameValidation}</font></div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                                <div><font color="red">{lastnameValidation}</font></div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="phone" placeholder="Enter Phone Number" value={phone} maxLength="10" onChange={(e) => setPhone(e.target.value)} />
                                <div><font color="red">{phoneValidation}</font></div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                <div><font color="red">{addressValidation}</font></div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupRoll">
                                <Form.Label>Role</Form.Label>
                                <Select
                                    label="Select somthing"
                                    value={roles.find(r => {
                                        return r.value === role
                                    })}
                                    options={roles}
                                    onChange={(e) => setRole(e.label)}
                                />
                                <div><font color="red">{roleValidation}</font></div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupRoll">
                                <Form.Label>Start Date</Form.Label>
                                <br />
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Form.Group>
                        </Form>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => validateFields()} >Update</Button>
                    <Button variant="danger" onClick={closeEdit}>Cancel</Button>
                </Modal.Footer>
            </Modal >
            <Modal
                show={showDialog}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {firstname} {lastname} from
                    employees?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={deleteEmployee}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default EditEmployee;
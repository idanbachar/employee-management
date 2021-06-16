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

    const roles = [
        { label: 'HR', value: 'HR' },
        { label: 'Programmer', value: 'Programmer' },
        { label: 'Data Analyst', value: 'Data Analyst' }
    ]

    const validateData = () => {

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
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="phone" placeholder="Enter Phone Number" maxLength="10" onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRoll">
                            <Form.Label>Role</Form.Label>
                            <Select
                                label="Select somthing"
                                options={roles}
                                onChange={(e) => setRole(e.value)}
                            />
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
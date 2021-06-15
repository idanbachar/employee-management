import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddEmployee = (props) => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const validateData = () => {

        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "address": address,
            "roll": "HR",
            "startdate": "2 Feb 2020"
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
                            {/* <Form.Select >
                                <option>Disabled select</option>
                            </Form.Select> */}
                        </Form.Group>

                    </Form>


                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => validateData()}>Add Employee</Button>
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal >
    );
}


export default AddEmployee;
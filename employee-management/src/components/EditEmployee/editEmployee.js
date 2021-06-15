import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ArrowRight, PencilFill, TrashFill } from 'react-bootstrap-icons';

const EditEmployee = (props) => {

    const [firstname, setFirstName] = useState(props.data.firstname);
    const [lastname, setLastName] = useState(props.data.lastname);
    const [phone, setPhone] = useState(props.data.phone);
    const [address, setAddress] = useState(props.data.address);

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setModalShow(true)}><PencilFill /></Button>
            <Button variant="danger" onClick={() => props.data.deleteHandler(props.data.id)}><TrashFill /></Button>

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
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="phone" placeholder="Enter Phone Number" value={phone} maxLength="10" onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                    <Button variant="success" >Edit Employee</Button>
                    <Button variant="danger" onClick={() => setModalShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal >

        </div>


    );
}


export default EditEmployee;
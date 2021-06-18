import React, { useEffect, useState } from 'react';
import EditEmployee from '../EditEmployee/editEmployee';
import Card from 'react-bootstrap/Card'
import { PencilFill, Phone, Hr, House, TelephoneFill } from 'react-bootstrap-icons';

const EmployeeCard = (props) => {


    return (
        <Card >
            <Card.Header>
                <img width="50" src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" />
                <b>{props.firstname} {props.lastname}</b>
                <div>
                    {props.isEditable ?
                        <EditEmployee data={props} />
                        : null}
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Hr />{props.role}
                    <br />
                    <small>Start Date: {props.startDate}</small>
                </Card.Text>
                <Card.Text>
                    <TelephoneFill /> {props.phone}
                </Card.Text>
                <Card.Text>
                    <House /> {props.address}
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default EmployeeCard;
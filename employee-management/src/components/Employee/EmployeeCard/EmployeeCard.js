import React, { useEffect, useState } from 'react';
import EditEmployee from '../EditEmployee/EditEmployee';
import Card from 'react-bootstrap/Card'
import { Hr, House, TelephoneFill } from 'react-bootstrap-icons';

const EmployeeCard = (props) => {

    // state of indication of is mobile resolution:
    const [isMobile, setIsMobile] = useState(false);

    // handles indication of is mobile state
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {

        // listen to screen resolution change and calls handle resize function:
        window.addEventListener("resize", handleResize)

    }, [])

    return (
        <>
            {           /*   2 displays: for computer and mobile     */
                !isMobile ?
                    <tr>
                        <td><img width="70" src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" /></td>
                        <td>{props.firstname}</td>
                        <td>{props.lastname}</td>
                        <td>{props.phone}</td>
                        <td>{props.address}</td>
                        <td>{props.role}</td>
                        <td>{props.startDate}</td>
                        {props.isEditable ?
                            <td><EditEmployee data={props} /></td>
                            : null}
                    </tr>
                    :
                    <Card>
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
            }
        </>
    )
}
export default EmployeeCard;
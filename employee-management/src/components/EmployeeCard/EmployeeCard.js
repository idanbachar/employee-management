import React, { useEffect, useState } from 'react';
import EditEmployee from '../EditEmployee/editEmployee';

const EmployeeCard = (props) => {

    return (
        <tr>
            <td><img width="70" src="https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png" /></td>
            <td>{props.firstname}</td>
            <td>{props.lastname}</td>
            <td>{props.phone}</td>
            <td>{props.address}</td>
            <td>{props.role}</td>
            <td>{props.startDate}</td>
            {props.isEditable ?
                <div>
                    <td><EditEmployee data={props} /></td>
                </div>
                : null}
        </tr>
    )

}

export default EmployeeCard;
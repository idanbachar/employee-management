import React, { useEffect, useState } from 'react';
import EditEmployee from '../EditEmployee/editEmployee';

const EmployeeCard = (props) => {

    return (
        <tr>
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
import React from 'react';

const StudentDetails = (props) => {
    console.log(props);
    return(
        <tr>
            <td>{props.student.name}</td>
        </tr>
    )
}

export default StudentDetails;
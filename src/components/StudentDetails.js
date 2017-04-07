import React from 'react';

const StudentDetails = (props) => {

    return(
        <tr id={props.student.id}>
           <td>{props.student.name}</td>
           <td>{props.student.course}</td>
           <td>{props.student.grade}</td>
           <td><button className='btn btn-danger' onClick={(e) => props.handleDelete(e)} >Delete</button></td>
        </tr>
    )
}

export default StudentDetails;
import React from 'react';

const StudentDetails = (props) => {
  
  return (
    <tr id={props.student.id}>
      <td>{props.student.name}</td>
      <td>{props.student.course}</td>
      <td>{props.student.grade}</td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          onClick={(e) => props.handleDelete(e)}>Delete</button>
        <button
          className='btn btn-warning btn-sm'
          onClick={(e) => props.handleUpdate(props)}>Update</button>
      </td>
    </tr>
  );
}

export default StudentDetails;
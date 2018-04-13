import React from 'react';

const StudentDetails = (props) => {
  
  return (
    <tr id={props.student.id}>
      <td>{props.student.name}</td>
      <td>{props.student.course}</td>
      <td>{props.student.grade}</td>
      <td>
        <button
          style={{ marginRight: '10px', marginBottom: '10px' }}
          className='btn btn-danger btn-sm'
          onClick={(e) => props.handleDelete(e)}>Delete</button>
        <button
          style={{ marginRight: '10px', marginBottom: '10px' }}
          className='btn btn-info btn-sm'
          onClick={(e) => props.handleUpdate(props)}>Update</button>
      </td>
    </tr>
  );
}

export default StudentDetails;
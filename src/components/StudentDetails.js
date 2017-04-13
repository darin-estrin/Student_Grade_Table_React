import React from 'react';

const StudentDetails = (props) => {

    const renderButton = function(){
        if(!props.getDataClicked){
            return <button className='btn btn-danger'
            onClick={ (e) => props.handleDelete(e) } >Delete</button>
        } else {
            return <button className='btn btn-warning'
            onClick={ (e) => props.handleUpdate(props) } >Update Grade</button>
        }
    }

    return(
        <tr id={ props.student.id }>
           <td>{ props.student.name }</td>
           <td>{ props.student.course }</td>
           <td>{ props.student.grade }</td>
           <td>
            { renderButton() }
           </td>
        </tr>
    )
}

export default StudentDetails;
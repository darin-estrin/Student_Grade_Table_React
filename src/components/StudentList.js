import React from 'react';
import StudentDetails from './StudentDetails';

const StudentList = (props) =>{

    const student = props.students.map((student, index) => {
        return <StudentDetails key={ student.id } 
                student={ student } getDataClicked={ props.getDataClicked }
                handleDelete={ props.handleDelete }  handleUpdate={ props.handleUpdate } />
    });
    
    return (
        <div className="student-list-container col-sm-9 col-xs-12">
            <table className="student-list table table-striped">
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student Course</th>
                    <th>Student Grade</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                    { student }
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
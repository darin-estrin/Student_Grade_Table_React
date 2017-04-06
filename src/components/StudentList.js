import React, { Component } from 'react';

class StudentList extends Component {


    render(){
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
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentList;
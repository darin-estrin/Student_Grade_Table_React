import React, { Component } from 'react';
import axios from 'axios';

class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            course: '',
            grade: ''
        }
    }

    handleChange(event){
        let value = event.value;
        if(event.name === 'studentName'){
            this.setState({ name: value });
        }
        if(event.name === 'course'){
            this.setState({ course: value });
        }
        if(event.name === 'studentGrade'){
            parseInt(value, 10);
            if(isNaN(value)){
                return
            }
            this.setState({ grade: value })
        }
    }

    clearForm(){
        this.setState({
            name: '',
            course: '',
            grade: ''
        });
    }

    handleAddClick(){
        if(this.state.grade < 0 || this.state.grade > 100 || this.state.grade === ''){
            alert('please enter a grade between 0 and 100');
        }
        if(this.state.name === ''){
            alert('please enter a name');
        }
        if(this.state.course === ''){
            alert('please enter a course');
        }

        let student = {
            name: this.state.name,
            course: this.state.course,
            grade: this.state.grade
        }

        

        this.setState({
            name: '',
            course: '',
            grade: ''
        });
    }

    render(){
        return(
            <div className="form-group student-add-form pull-right col-sm-3 col-xs-12">
                <h4>Add Student</h4>
                <div className='form-group input-group'>
                    <span className='input-group-addon'>
                        <span className='glyphicon glyphicon-user'></span>
                    </span>
                    <input type='text' className='form-control' name='studentName' placeholder='Student Name' value={this.state.name} onChange={(event) => this.handleChange(event.target)}/>
                </div>
                <div className="form-group input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-list-alt"></span>
                    </span>
                    <input type="text" className="form-control" name="course" placeholder="Student Course" value={this.state.course} onChange={(event) => this.handleChange(event.target)} />
                </div>
                <div className="form-group input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-education"></span>
                    </span>
                    <input type="text" className="form-control" name="studentGrade"
                   placeholder="Student Grade" value={this.state.grade} onChange={(event) => this.handleChange(event.target)} />
                </div>
                <button type="button" className="btn btn-success" onClick={this.handleAddClick.bind(this)}>Add</button>
                <button type="button" className="btn btn-default" onClick={this.clearForm.bind(this)}>Cancel</button>
            </div>
        )
    }
}

export default AddStudent;
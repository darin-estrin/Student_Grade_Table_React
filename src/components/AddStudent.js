import React, { Component } from 'react';
import uuid from 'uuid';

class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: uuid.v1(),
            name: '',
            course: '',
            grade: '',
            updateClicked: false
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
            grade: '',
            updateClicked: false
        });
    }

    handleAddClick(e){
        e.preventDefault();
        if(this.state.grade < 0 || this.state.grade > 100 || this.state.grade === ''){
            alert('please enter a grade between 0 and 100');
            return;
        }
        if(this.state.name === ''){
            alert('please enter a name');
            return;
        }
        if(this.state.course === ''){
            alert('please enter a course');
            return;
        }

        this.props.addStudent(this.state);

        this.setState({
            name: '',
            course: '',
            grade: '',
            id: uuid.v1()
        });

        document.getElementById('student').focus();
    }
    
    getDataButtonClicked(e){
        this.props.getDataClicked();
        this.setState({
            updateClicked: true
        });
    }

    renderDataButton(){
        if(!this.state.updateClicked){
            return <button type='button' className='btn btn-info' onClick={this.getDataButtonClicked.bind(this)}>Get Data</button>
        } else {
            return <button type='button' className='btn btn-primary' onClick={this.getDataButtonClicked.bind(this)}>Update Student</button>
        }
    }

    render(){
        return(
            <div className="form-group student-add-form pull-right col-sm-3 col-xs-12">
                <form onSubmit={this.handleAddClick.bind(this)}>
                    <h4>Add Student</h4>
                    <div className='form-group input-group'>
                        <span className='input-group-addon'>
                            <span className='glyphicon glyphicon-user'></span>
                        </span>
                        <input type='text' className='form-control' id='student' name='studentName' placeholder='Student Name' value={this.state.name} onChange={(event) => this.handleChange(event.target)}/>
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
                    <button type="submit" className="btn btn-success">Add</button>
                    <button type="button" className="btn btn-default" onClick={this.clearForm.bind(this)}>Cancel</button>
                    {this.renderDataButton()}
                </form>
            </div>
        )
    }
}

export default AddStudent;
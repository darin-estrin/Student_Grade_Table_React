import React, { Component } from 'react';
import uuid from 'uuid';
import firebase from 'firebase';

class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: uuid.v1(),
            name: '',
            course: '',
            grade: '',
            newStudent: true,
            updateClicked: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.setStudent.name  && this.state.updateClicked){
            this.setStudentState(nextProps.setStudent);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.activeStudent !== nextState.activeStudent){
            return true;
        } else if(this.state !== nextState){
            return true;
        } else {
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState){
        if(nextState.name && !nextState.updateClicked  && !this.state.newStudent){
            this.clearForm();
        } else {
            return nextState;
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
            id: uuid.v1(),
            newStudent: true
        });
    }

    handleAddClick(e){
        e.preventDefault();
        if(!this.state.newStudent){
            this.updateStudent();
            return;
        }
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

    cancelUpdate(){
        this.props.getDataClicked();
        this.setState({
            updateClicked: false
        });
    }

    renderDataButton(){
        if(!this.state.updateClicked){
            return <button type='button' className='btn btn-primary'
            onClick={ this.getDataButtonClicked.bind(this) }>Update Students</button>
        } else {
            return <button type='button' className='btn btn-primary'
            onClick={ this.updateStudent.bind(this) }>Confirm Update</button>
        }
    }

    updateStudent(){
        console.log(this.state);
        firebase.database().ref(`Students/${this.state.id}`).update(this.state);
        this.clearForm();
        this.cancelUpdate();
    }

    renderCancelButton(){
        if(!this.state.updateClicked){
            return <button type="button" className="btn btn-default"
            onClick={ this.clearForm.bind(this) }>Cancel</button>
        } else {
            return <button type='button' className='btn btn-default'
            onClick={ this.cancelUpdate.bind(this) }>Cancel</button>
        }
    }

    setStudentState(student) {
       this.setState({
           name: student.name,
           course: student.course,
           grade: student.grade,
           id: student.id,
           newStudent: false
       });
    }

    render(){
        return(
            <div className="form-group student-add-form pull-right col-sm-3 col-xs-12">
                <form onSubmit={ this.handleAddClick.bind(this) } >
                    <h4>Add Student</h4>
                    <div className='form-group input-group'>
                        <span className='input-group-addon'>
                            <span className='glyphicon glyphicon-user'></span>
                        </span>
                        <input type='text' className='form-control' id='student' name='studentName' placeholder='Student Name' value={ this.state.name } onChange={ (event) => this.handleChange(event.target) } />
                    </div>
                    <div className="form-group input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-list-alt"></span>
                        </span>
                        <input type="text" className="form-control" name="course" placeholder="Student Course" value={ this.state.course } onChange={ (event) => this.handleChange(event.target) } />
                    </div>
                    <div className="form-group input-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-education"></span>
                        </span>
                        <input type="text" className="form-control" name="studentGrade"
                    placeholder="Student Grade" value={ this.state.grade } onChange={ (event) => this.handleChange(event.target) } />
                    </div>
                    <button type="submit" className="btn btn-success">Add</button>
                    { this.renderCancelButton() }
                    { this.renderDataButton() }
                </form>
            </div>
        )
    }
}

export default AddStudent;
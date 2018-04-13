import React, {Component} from 'react';
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
			error: '',
			created: Date.now()
		}
	}

	// Life Cycle Methods
	componentWillReceiveProps(nextProps) {
		if (nextProps.setStudent.name) {
			this.setStudentState(nextProps.setStudent);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.activeStudent !== nextState.activeStudent) {
			return true;
		} else if (this.state !== nextState) {
			return true;
		} else {
			return false;
		}
	}

	// Custom methods
	clearForm() {
		this.setState({
			name: '',
			course: '',
			grade: '',
			id: uuid.v1(),
			error: '',
			created: Date.now(),
			updateClicked: false
		});
	}

	handleAddClick(e) {
		e.preventDefault();
		const form = e.target;
		const buttonClicked = form.querySelector('button');
		if (buttonClicked.innerText === 'Update') {
			this.updateStudent();
			return;
		}
		
		if (this.state.name === '') {
			this.setState({error: 'Please enter a name'});
			return;
		}
		if (this.state.course === '') {
			this.setState({error: 'Please enter a course'});
			return;
		}
		if (this.state.grade < 0 || this.state.grade > 100 || this.state.grade === '') {
			this.setState({error: 'Please enter a grade between 0 and 100'});
			return;
		}
		this.props.addStudent(this.state);

		this.setState({
			name: '',
			course: '',
			grade: '',
			id: uuid.v1(),
			error: '',
			created: Date.now()
		});

		document.getElementById('student').focus();
	}

	handleCancelClicked(e) {
		this.clearForm();
	}

	handleChange(event) {
		let value = event.value;
		if (event.name === 'studentName') {
			this.setState({name: value});
		}

		if (event.name === 'course') {
			this.setState({course: value});
		}

		if (event.name === 'studentGrade') {
			parseInt(value, 10);
			if (isNaN(value)) {
				return
			}

			this.setState({grade: value})
		}
	}

	renderButtons() {
		if (!this.state.updateClicked) {
			return <button type="submit" className="btn btn-success">Add</button>;
		} else {
			return <button type="submit" className="btn btn-success">Update</button>
		}
	}

	renderError() {
		if (this.state.error) {
			return (
				<div className='alert alert-danger'>
					<strong>{this.state.error}</strong>
				</div>
			);
		} else {
			return <div></div>
		}
	}

	setStudentState(student) {
		this.setState({
			name: student.name,
			course: student.course,
			grade: student.grade,
			id: student.id,
			error: '',
			created: student.created,
			updateClicked: true
		});
	}

	updateStudent() {
		firebase.database().ref(`Students/${this.state.id}`).update(this.state);
		this.props.updatedStudent();
		this.clearForm();
	}

	// Render Method
	render() {
		return (
			<div className="form-group student-add-form pull-right col-sm-3 col-xs-12">

				<form onSubmit={this.handleAddClick.bind(this)}>
					<h4>Add Student</h4>

					<div className='form-group input-group'>
						<span className='input-group-addon'>
							<span className='glyphicon glyphicon-user'></span>
						</span>
						<input
							type='text'
							className='form-control'
							id='student'
							name='studentName'
							placeholder='Student Name'
							value={this.state.name}
							onChange={(event) => this.handleChange(event.target)}/>
					</div>

					<div className="form-group input-group">
						<span className="input-group-addon">
							<span className="glyphicon glyphicon-list-alt"></span>
						</span>
						<input
							type="text"
							className="form-control"
							name="course"
							placeholder="Student Course"
							value={this.state.course}
							onChange={(event) => this.handleChange(event.target)}/>
					</div>

					<div className="form-group input-group">
						<span className="input-group-addon">
							<span className="glyphicon glyphicon-education"></span>
						</span>
						<input
							type="text"
							className="form-control"
							name="studentGrade"
							placeholder="Student Grade"
							value={this.state.grade}
							onChange={(event) => this.handleChange(event.target)}/>
					</div>

					{this.renderError()}
					{this.renderButtons()}
					<button
						type="button"
						className="btn btn-warning pull-right"
						onClick={(e) => this.handleCancelClicked(e)}>Cancel</button>
				</form>
			</div>
		);
	}
}

export default AddStudent;
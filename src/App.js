import React, { Component } from 'react';
import firebase from 'firebase';
import Header from './components/Header';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList.js'

class App extends Component {

  constructor(props){
    super(props);
    
    var config = {
      apiKey: "AIzaSyCwuNtpCmcu8bPGlYeFhQfHHj3AThKaSjg",
      authDomain: "student-grade-table-d99c1.firebaseapp.com",
      databaseURL: "https://student-grade-table-d99c1.firebaseio.com",
      projectId: "student-grade-table-d99c1",
      storageBucket: "student-grade-table-d99c1.appspot.com",
      messagingSenderId: "166741700159"
    };

    firebase.initializeApp(config);
      
      this.state = {
        students: [],
        average: '',
        activeStudent: {}
      }
  }

  // Life Cycle Methods
  componentDidMount(){
    this.getStudentGrades();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.students.length > this.state.students.length) {
      
    }
  }

  // Custom Methods
  addStudentToDatabase(student){
    firebase.database().ref(`/Students/${student.id}`).set(student);
    const { students } = this.state;

    this.setState({
      students: [...students, student]
    });
    this.getStudentGrades();
  }

  deleteStudent(e){
    const studentId = e.target.parentNode.parentNode.id;
    const deleteStudent = firebase.database().ref(`Students/${studentId}`);
    deleteStudent.remove();
    this.getStudentGrades();
    this.setState({ activeStudent: false });
  }

  getStudentGrades(){
    var self = this;
    var students = []
    let average = 0;
    let index = 0;
    var firebaseRef = firebase.database().ref('Students');
    firebaseRef.once('value')
      .then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
          students.push(childSnapshot.val());
          const grade = parseFloat(students[index].grade);
          index++
          average += grade;
        });

        self.setState({
          students,
          average: Math.round(average / students.length)
        });
      });
  }

  updatedStudentGrade() {
    this.setState({ activeStudent: {} });
    this.getStudentGrades();
  }

  updateStudentClicked(e){
    this.setState({
      activeStudent: {
        name: e.student.name,
        course: e.student.course,
        id: e.student.id,
        grade: e.student.grade,
        created: e.student.created
      }
    });
  }

  // Render Method
  render() {
    return (
      <div className="App container">
        <Header average={ this.state.average } />
        <AddStudent 
          addStudent={ (student) => this.addStudentToDatabase(student) }
          updatedStudent={ () => this.updatedStudentGrade() }
          setStudent={ this.state.activeStudent } />
        <StudentList
          students={ this.state.students }
          handleDelete={ (student) => this.deleteStudent(student) }
          handleUpdate={ (e) => this.updateStudentClicked(e) } />
      </div>
    );
  }
}

export default App;

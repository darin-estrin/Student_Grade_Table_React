import React, { Component } from 'react';
import firebase from 'firebase';
import Header from './components/Header';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList.js'
import config from './firebase';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      students: []
    }
  }

  componentDidMount(){
    var self = this;
    var firebaseRef = firebase.database().ref('Students');
    firebaseRef.once('value')
      .then(function(snapshot){
        self.setState({
          students: [snapshot.val()]
        });
      });
  }

  getStudentGrades() {
      firebase.database().ref('Students').on('value', function(snapshot){
        console.log(snapshot.val());
        return snapshot.val();
      });
  }

  addStudentToDatabase(student){
   firebase.database().ref(`/Students/${student.id}`).set(student);
   const { students } = this.state;

   console.log('new student: ', [...students, student]);

   this.setState({
     students: [...students, student]
   })
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <AddStudent addStudent={(student) => this.addStudentToDatabase(student)} />
        <StudentList students={ this.state.students } />
      </div>
    );
  }
}

export default App;

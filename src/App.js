import React, { Component } from 'react';
import Header from './components/Header';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <AddStudent  />
        <StudentList />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="page-header">
                <h1 className='hidden-xs'>Student Grade Table
                    <small>Grade Average : <span className="avgGrade label label-default"></span></small>
                </h1>
                <h3 className="visible-xs">Student Grade Table
                    <small>Grade Average : <span className="avgGrade label label-default"></span></small>
                </h3>
            </div>
        )
    }
}

export default Header;
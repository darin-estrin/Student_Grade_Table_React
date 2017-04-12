import React from 'react';

const Header = (props) => {

    return(
            <div className="page-header">
                <h1 className='hidden-xs'>Student Grade Table
                    <small>Grade Average : { props.average ? props.average : '0' } <span className="avgGrade label label-default"></span></small>
                </h1>
                <h3 className="visible-xs">Student Grade Table
                    <small>Grade Average : { props.average ? props.average : '0' } <span className="avgGrade label label-default"></span></small>
                </h3>
            </div>
        )
}

export default Header;
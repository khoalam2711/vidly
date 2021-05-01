import React, { Component } from 'react';
class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <a className='navbar-brand' href='#'>
                    There are {this.props.totalCounters} counters
                </a>
            </nav>
        );
    }
}

export default NavBar;

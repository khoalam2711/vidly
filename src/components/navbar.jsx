import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
                <Link className='navbar-brand' to='/'>
                    Vidly
                </Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <NavLink className='nav-item nav-link' to='/movies'>
                            Movies
                        </NavLink>
                        <NavLink className='nav-item nav-link' to='/customers'>
                            Customers
                        </NavLink>
                        <NavLink className='nav-item nav-link' to='/rentals'>
                            Rentals
                        </NavLink>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;

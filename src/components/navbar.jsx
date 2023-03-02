import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
class NavBar extends Component {
	render() {
		const { user } = this.props;
		return (
			<nav className="navbar navbar-expand navbar-light bg-light mb-4">
				<Link className="navbar-brand" to="/">
					Vidly
				</Link>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav mr-auto">
						<NavLink className="nav-item nav-link" to="/movies">
							Movies
						</NavLink>
						{!user ? (
							<NavLink className="nav-item nav-link" to="/registerForm">
								Register
							</NavLink>
						) : (
							<div className="nav-item nav-link">
								{user.name}
							</div>
						)}
					</ul>
					{!user ? (
						<NavLink className="nav-item nav-link" to="/login">
							<button className="btn btn-outline-success" type="submit">
								Login
							</button>
						</NavLink>
					) : (
						<NavLink className="nav-item nav-link" to="/logout">
							<button className="btn btn-outline-danger" type="submit">
								Logout
							</button>
						</NavLink>
					)}
				</div>
			</nav>
		);
	}
}

export default NavBar;

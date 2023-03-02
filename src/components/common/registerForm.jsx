import React from 'react';
import Form from './Form';
import Joi from 'joi-browser';
import { registerUser } from '../../services/userService';
import authService from '../../services/authService';
import toast from 'react-toastify';
class RegisterForm extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().required().label('Password'),
		name: Joi.string().required().label('Password'),
	};

	doSubmit = async () => {
		try {
			const response = await registerUser(this.state.data);
			authService.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};
	render() {
		return (
			<div className='container w-75'>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;

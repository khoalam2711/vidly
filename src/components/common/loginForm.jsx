import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Form from './Form';
class LoginForm extends Form {
    state = {
        data: { username: '', password: ''},
        errors: {},
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit = () => {
        console.log('Submitted');
    };
    render() {
        const { data, errors } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;

import React, { Component } from 'react';
import { Router } from 'react-router';
class MovieForm extends Component {
	handleSave = () => {
		this.props.history.replace('/movies');
	}
	render() { 
		const {id} = this.props.match.params
		return ( 
			<div>
				<h1>Movie Form {id}</h1>
				<button className="btn btn-primary sm" onClick = {this.handleSave}>Save</button>
			</div>
		 );
	}
}
 
export default MovieForm;
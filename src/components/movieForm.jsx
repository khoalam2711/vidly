import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
class MovieForm extends Form {
	state = {
		data: {
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: '',
		},
		errors: {},
		genres: [],
	};
	schema = {
		title: Joi.string().label('Title'),
		numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
		dailyRentalRate: Joi.number()
			.min(0)
			.max(10)
			.precision(2)
			.label('Daily Rental Rates'),
		genreId: Joi.string(),
		_id: Joi.string(),
	};

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async populateMovie() {
		try {
			const { id } = this.props.match.params;
			if (id === 'new') return;
			const { data: movie } = await getMovie(id);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}
	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovie();
	}

	mapToViewModel = (movie) => {
		const data = {};
		data._id = movie._id;
		data.title = movie.title;
		data.genreId = movie.genre._id;
		data.numberInStock = movie.numberInStock;
		data.dailyRentalRate = movie.dailyRentalRate;
		return data;
	};

	handleSelect = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data.genre = input.value;
		this.setState({ data });
		console.log(this.state.data);
	};

	doSubmit = async () => {
		await saveMovie(this.state.data);
		this.props.history.replace('/movies');
	};

	render() {
		// console.log(this.state.data.genre);
		const { genres } = this.state;
		return (
			<div>
				<div className='container w-75'>
					<h1>Movie Form</h1>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput('title', 'Title')}
						{this.renderSelect('genreId', 'Genre', genres)}
						{this.renderInput('numberInStock', 'Number in Stock')}
						{this.renderInput('dailyRentalRate', 'Rates')}
						{this.renderButton('Save')}
					</form>
				</div>
			</div>
		);
	}
}

export default MovieForm;

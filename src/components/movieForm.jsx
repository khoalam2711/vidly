import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Form from './common/Form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';
class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRates: '',
        },
        errors: {},
        genres: [],
    };
    schema = {
        title: Joi.string().label('Title'),
        numberInStock: Joi.number().min(0).max(100).label('Number in Stock'),
        dailyRentalRates: Joi.number()
            .min(0)
            .max(10)
            .precision(2)
            .label('Daily Rental Rates'),
        genreId: Joi.string(),
		_id: Joi.string()
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const { id } = this.props.match.params;
        if (id === 'new') return;

        const movie = getMovie(id);
        if (movie == null) return this.props.history.replace('/not-found');

        this.setState({ data: this.mapToViewModel(movie) });
    }

    mapToViewModel = (movie) => {
        const data = {};
		data._id = movie._id;
        data.title = movie.title;
        data.genreId = movie.genre._id;
        data.numberInStock = movie.numberInStock;
        data.dailyRentalRates = movie.dailyRentalRate;
        return data;
    };

    handleSelect = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data.genre = input.value;
        this.setState({ data });
        console.log(this.state.data);
    };

    doSubmit = () => {
        saveMovie(this.state.data);

        this.props.history.replace('/movies');
    };
    render() {
        const { id } = this.props.match.params;
        // console.log(this.state.data.genre);
        const { genres, data } = this.state;
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', genres)}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRates', 'Rates')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;

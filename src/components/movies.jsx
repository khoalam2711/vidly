import React, { Component } from 'react';
import reactDom from 'react-dom';
import { getMovies } from '../services/fakeMovieService';
import LikeButton from './common/likeButton';
import Pagination from './common/Pagination';
class Movies extends Component {
    state = {
        movies: getMovies(),
    };
    renderMovie = (movie) => {
        let {
            title,
            genre: { name },
            numberInStock,
            dailyRentalRate,
        } = movie;
        return (
            <tr>
                <td>{title}</td>
                <td>{name}</td>
                <td>{numberInStock}</td>
                <td>{dailyRentalRate}</td>
            </tr>
        );
    };

    // renderMovies = () => {
    //     // let {
    //     //     title,
    //     //     genre: { name },
    //     //     numberInStock,
    //     //     dailyRentalRate,
    //     // } = this.state.movies.map();
    //     let result = this.state.movies.map((movie) => {
    //         let {
    //             title,
    //             genre: { name },
    //             numberInStock,
    //             dailyRentalRate,
    //         } = movie;
    //         return (
    //             <tr key={movie._id}>
    //                 <td>{title}</td>
    //                 <td>{name}</td>
    //                 <td>{numberInStock}</td>
    //                 <td>{dailyRentalRate}</td>
    //                 <td>
    //                     <button
    //                         onClick={(movie) => this.handleDelete(movie)}
    //                         type="button"
    //                         className="btn btn-outline-danger"
    //                     >
    //                         Delete
    //                     </button>
    //                 </td>
    //             </tr>
    //         );
    //     });
    //     return result;
    // };

    handleDelete = (movie) => {
        //console.log(movie);
        let movies = this.state.movies.filter((m) => m._id !== movie._id);
        let remainingMovies = movies.length;
        this.setState({ movies, remainingMovies });
        // this.state.movies.
    };

    handleLike = (movie) => {
        let movies = [...this.state.movies];
        let index = this.state.movies.indexOf(movie);
        let likedMovie = { ...this.state.movies[index] };
        likedMovie.liked = 1;
        movies[index] = likedMovie;
        this.setState({ movies });
    };

    handleUnlike = (movie) => {
        let movies = [...this.state.movies];
        let index = this.state.movies.indexOf(movie);
        let likedMovie = { ...this.state.movies[index] };
        likedMovie.liked = 0;
        movies[index] = likedMovie;
        this.setState({ movies });
    };

    render() {
        if (this.state.movies.length === 0)
            return <p>There are no movies in the DB!</p>;
        return (
            <div>
                <p>Showing {this.state.movies.length} movies in the DB</p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Title</th>
                            <th scope='col'>Genre</th>
                            <th scope='col'>Stock</th>
                            <th scope='col'>Rates</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((movie) => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <LikeButton
                                        isLiked={movie.liked}
                                        onLike={() => this.handleLike(movie)}
                                        onUnlike={() =>
                                            this.handleUnlike(movie)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        className='btn btn-outline-danger'
                                        onClick={() => this.handleDelete(movie)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
				<Pagination totalItems = {this.state.movies.length} pageSize = {10}></Pagination>
            </div>
        );
    }
}
export default Movies;

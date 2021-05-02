import React, { Component } from 'react';
import reactDom from 'react-dom';
import { getMovies } from '../services/fakeMovieService';
import LikeButton from './common/likeButton';
import Pagination from './common/Pagination';
import { paginate } from './utils/paginate';
class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
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

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    render() {
        if (this.state.movies.length === 0)
            return <p>There are no movies in the DB!</p>;
        const movies = paginate(
            this.state.movies,
            this.state.currentPage,
            this.state.pageSize
        );
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
                        {movies.map((movie) => (
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
                <Pagination
                    totalItems={this.state.movies.length}
                    pageSize={this.state.pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={this.state.currentPage}
                ></Pagination>
            </div>
        );
    }
}
export default Movies;

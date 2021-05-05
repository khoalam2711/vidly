import React, { Component } from 'react';
import reactDom from 'react-dom';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/Pagination';
import { paginate } from './utils/paginate';
import ListGroup from './common/ListGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'asc' },
    };
    // renderMovie = (movie) => {
    //     let {
    //         title,
    //         genre: { name },
    //         numberInStock,
    //         dailyRentalRate,
    //     } = movie;
    //     return (
    //         <tr>
    //             <td>{title}</td>
    //             <td>{name}</td>
    //             <td>{numberInStock}</td>
    //             <td>{dailyRentalRate}</td>
    //         </tr>
    //     );
    // };

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

    componentDidMount() {
        const genres = [{ _id: '', name: 'All genres' }, ...getGenres()];

        this.setState({ movies: getMovies(), genres });
    }

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

    handleGenreSelect = (item) => {
        const selectedGenre = item;
        this.setState({ selectedGenre, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };
    render() {
        if (this.state.movies.length === 0)
            return <p>There are no movies in the DB!</p>;
        const filtered =
            this.state.selectedGenre && this.state.selectedGenre._id
                ? this.state.movies.filter(
                      (m) => m.genre._id === this.state.selectedGenre._id
                  )
                : this.state.movies;
        const sorted = _.sortBy(
            filtered,
            [this.state.sortColumn.path],
            [this.state.sortColumn.order]
        );
        const movies = paginate(
            // this.state.movies,
            sorted,
            this.state.currentPage,
            this.state.pageSize
        );
        return (
            <div className='row'>
                <div className='col-2'>
                    <ListGroup
                        items={this.state.genres}
                        onGroupSelect={this.handleGenreSelect}
                        selectedGroup={this.state.selectedGenre}
                    ></ListGroup>
                </div>
                <div className='col'>
                    <p>Showing {sorted.length} movies in the DB</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onUnlike={this.handleUnlike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        // sortColumn={this.state.sortColumn}
                    />
                    <Pagination
                        totalItems={sorted.length}
                        pageSize={this.state.pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={this.state.currentPage}
                    ></Pagination>
                </div>
            </div>
        );
    }
}
export default Movies;

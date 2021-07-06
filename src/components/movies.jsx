import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import SearchBox from './common/searchBox';
import { paginate } from './utils/paginate';
import MoviesTable from './moviesTable';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import { toast } from 'react-toastify';
class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        selectedGenre: null,
        sortColumn: { path: 'title', order: 'desc' },
        searchQuery: '',
    };

    async componentDidMount() {
        const { data: dbGenres } = await getGenres();
        const genres = [{ _id: '', name: 'All genres' }, ...dbGenres];
        const { data: movies } = await getMovies();

        this.setState({ movies, genres });
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        let movies = this.state.movies.filter((m) => m._id !== movie._id);
        this.setState({ movies });
        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('This movie has already been deleted');
            console.log(originalMovies);
            this.setState({ movies: originalMovies });
        }

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
        const searchQuery = '';
        this.setState({ selectedGenre, currentPage: 1, searchQuery });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            selectedGenre,
            movies,
            sortColumn,
            currentPage,
            pageSize,
            searchQuery,
        } = this.state;
        let filtered = {};
        if (!searchQuery) {
            filtered =
                selectedGenre && selectedGenre._id
                    ? movies.filter((m) => m.genre._id === selectedGenre._id)
                    : movies;
        } else {
            filtered = movies.filter((m) =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );
        const data = paginate(
            // movies,
            sorted,
            currentPage,
            pageSize
        );
        return { totalCount: filtered.length, data };
    };

    handleSearch = ({ currentTarget: input }) => {
        const searchQuery = input.value;
        this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
    };

    render() {
        if (this.state.movies.length === 0)
            return <p>There are no movies in the DB!</p>;
        const { data: movies, totalCount } = this.getPagedData();
        const { searchQuery } = this.state;
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
                    <Link to='/movies/new'>
                        <button className='btn btn-primary mb-3'>
                            New Movie
                        </button>
                    </Link>
                    <SearchBox
                        searchQuery={searchQuery}
                        onSearch={this.handleSearch}
                    />
                    <p>Showing {totalCount} movies in the DB</p>
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onUnlike={this.handleUnlike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={this.state.sortColumn}
                    />
                    <Pagination
                        totalItems={totalCount}
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

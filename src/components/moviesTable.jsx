import React, { Component } from 'react';
import LikeButton from './common/likeButton';
import Table from './common/table';
class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rates' },
        {
            key: 'like',
            content: (movie) => (
                <LikeButton
                    isLiked={movie.liked}
                    onLike={() => this.props.onLike(movie)}
                    onUnlike={() => this.props.onUnlike(movie)}
                    item={movie}
                />
            ),
        },
        {
            key: 'delete',
            content: (movie) => (
                <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => this.props.onDelete(movie)}
                >
                    Delete
                </button>
            ),
        },
    ];
    /*     raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        console.log(this.props.sortColumn);
        console.log(sortColumn);
        if (path === sortColumn.path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        // else this.setState({ sortColumn: { path, order: 'asc' } });
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }; */

    render() {
        const { movies, onLike, onUnlike, onSort, sortColumn } = this.props;
        return (
			<Table columns = {this.columns} sortColumn = {sortColumn} onSort = {onSort} data = {movies}/>
        );
        {
            /* <thead>
                    <tr>
                        <th onClick={() => this.raiseSort('title')} scope='col'>
                            Title
                        </th>
                        <th
                            onClick={() => this.raiseSort('genre.name')}
                            scope='col'
                        >
                            Genre
                        </th>
                        <th
                            onClick={() => this.raiseSort('numberInStock')}
                            scope='col'
                        >
                            Stock
                        </th>
                        <th
                            onClick={() => this.raiseSort('dailyRentalRate')}
                            scope='col'
                        >
                            Rates
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead> */
        }
        {
            /* <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <LikeButton
                                    isLiked={movie.liked}
                                    onLike={() => onLike(movie)}
                                    onUnlike={() => onUnlike(movie)}
                                />
                            </td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-outline-danger'
                                    onClick={() => onDelete(movie)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody> */
        }
    }
}

export default MoviesTable;

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
	render() {
		const { movies, onSort, sortColumn } = this.props;
		return (
			<Table
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				data={movies}
			/>
		);
	}
}

export default MoviesTable;

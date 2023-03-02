import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
//Input: totalItems, currentPage, pageSize
//Events: onNext, onPrevious, onChange
class Pagination extends Component {
	render() {
		const { totalItems, pageSize, onPageChange, currentPage } = this.props;
		const totalPages = totalItems / pageSize;
		if (totalPages <= 1) return null;
		const pages = _.range(1, totalPages + 1);

		return (
			<nav>
				<ul className="pagination">
					{pages.map((page) => {
						return (
							<React.Fragment key={page}>
								<li
									className={page === currentPage ? 'page-item active' : 'page-item'}
									key={page.toString()}
								>
									<span
										className="page-link"
										onClick={() => onPageChange(page)}
										key={page.toString()}
									>
										{page}
									</span>
								</li>
							</React.Fragment>
						);
					})}
				</ul>
			</nav>
		);
	}
}

Pagination.propTypes = {
	totalItems: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};
export default Pagination;

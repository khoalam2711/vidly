import React, { Component } from 'react';
import _ from 'lodash';
import reactDom from 'react-dom';
//Input: totalItems, currentPage, pageSize
//Events: onNext, onPrevious, onChange
class Pagination extends Component {
    render() {
        const { totalItems, pageSize } = this.props;
        const totalPages = totalItems / pageSize;
        if (totalPages <= 1) return null;
        const pages = _.range(1, totalPages + 1);

        return (
            <nav>
                <ul className='pagination'>
                    {/* <li className='page-item'>
                        <a className='page-link'>1</a>
                    </li> */}
                    {pages.map((p) => (
                        <React.Fragment>
                            <li className='page-item'>
                                <a className='page-link'>{p}</a>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default Pagination;

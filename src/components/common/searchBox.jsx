import React, { Component } from 'react';
class SearchBox extends Component {
    render() {
        const { searchQuery, onSearch } = this.props;
        return (
            <div className='input-group rounded mb-3'>
                <input
                    value={searchQuery}
                    onChange={onSearch}
                    type='search'
                    className='form-control rounded'
                    placeholder='Search'
                    aria-label='Search'
                    aria-describedby='search-addon'
                />
                <span className='input-group-text border-0' id='search-addon'>
                    <i className='fa fa-search'></i>
                </span>
            </div>
        );
    }
}

export default SearchBox;

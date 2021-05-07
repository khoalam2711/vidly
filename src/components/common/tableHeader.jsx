import React, { Component } from 'react';
//columns
//onSort
//sortColumn

class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (path === sortColumn.path)
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        // else this.setState({ sortColumn: { path, order: 'asc' } });
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

	renderSortIcon = (column) => {
		if (this.props.sortColumn.path !== column.path) return null;
		return (this.props.sortColumn.order === 'asc') ? <i className = 'fa fa-sort-asc'></i> : <i className = 'fa fa-sort-desc'></i>
	}
    render() {
        return (
            <thead>
				<tr>
                {this.props.columns.map((c) => (
                    <th className = 'clickable' key = {c.path || c.key}  scope='col' onClick = {() => this.raiseSort(c.path)}>{c.label} {this.renderSortIcon(c)}</th>
                ))}
				</tr>
            </thead>
        );
    }
}

export default TableHeader;

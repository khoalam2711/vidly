import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';
//movies
class TableBody extends Component {
	renderCell = (item, column) => {
		if (column.path === 'title')
			return <Link to={`/movies/${item._id}`}>{item[column.path]}</Link>;

		const user = getCurrentUser();
		if (column.key === 'delete' && !user) return null;
		if (column.key === 'delete' && user) if (!user.isAdmin) return null;

		if (column.content) return column.content(item);
		else return _.get(item, column.path);
	};
	render() {
		const { data, columns } = this.props;
		return (
			<tbody>
				{data.map((item) => (
					<tr key={item._id}>
						{columns.map((column) => (
							<td key={column.path ? column.path : column.key}>
								{this.renderCell(item, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

export default TableBody;

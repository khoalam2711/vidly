import React, { Component } from 'react';

//input: groups, currentGroup,
//events: onGroupSelect

class ListGroup extends Component {
    render() {
        return (
            <ul className='list-group'>
                {this.props.items.map((i) => (
                    <li
												role="button"
                        key={i[this.props.valueProperty]}
                        className={
                            i === this.props.selectedGroup
                                ? 'list-group-item active'
                                : 'list-group-item'
                        }
                        onClick={() => this.props.onGroupSelect(i)}
                    >
                        {i[this.props.textProperty]}
                    </li>
                ))}
            </ul>
        );
    }
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
};
export default ListGroup;

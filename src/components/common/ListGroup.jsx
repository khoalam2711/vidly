import React, { Component } from 'react';

//input: groups, currentGroup,
//events: onGroupSelect

class ListGroup extends Component {
    render() {
        return (
            <ul className='list-group ml-4'>
                {/* <li className='list-group-item'>Crab</li>
                <li className='list-group-item active'>Sponge</li>
                <li className='list-group-item'>Starfish</li> */}
                {/* <li className='list-group-item'>All genres</li> */}
                {this.props.items.map((i) => (
                    <li
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

import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    // state = {
    //     counters: [
    //         { id: 1, value: 0 },
    //         { id: 2, value: 3 },
    //         { id: 3, value: 0 },
    //         { id: 4, value: 4 },
    //     ],
    // };
    // handleDelete = (counterId) => {
    //     //console.log("Called event", counterId);
    //     let counters = this.state.counters.filter((c) => c.id != counterId);
    //     this.setState({ counters });
    // };
    render() {
        return (
            <React.Fragment>
                <button
                    className='btn btn-primary m-2'
                    onClick={this.props.onReset}
                >
                    Reset
                </button>
                {this.props.counters.map((counter) => (
                    <Counter
                        key={counter.id}
                        counter={counter}
                        onDelete={this.props.onDelete}
                        onIncrement={this.props.onIncrement}
                        onDecrement={this.props.onDecrement}
                    />
                ))}
            </React.Fragment>
        );
    }
}

export default Counters;

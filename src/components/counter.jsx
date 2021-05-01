import React, { Component } from 'react';
class Counter extends Component {
    // state = {
    //     counter: this.props.counter.value,
    // };
    // handleIncrement = () => {
    //     let counter = this.state.counter + 1;
    //     this.setState({counter});
    // };

    formatCount = () => {
        if (this.props.counter.value === 0) return 'Zero';
        else return this.props.counter.value;
    };

    // formatDecrement = () => {
    //     if (this.props.counter.value === 0) return
    // 	<button
    // 		className='btn btn-secondary m-2'
    // 		onClick={() => this.props.onDecrement(this.props.counter)}
    // 	>
    // 		-
    // 	</button>
    //     else
    //         return
    //             <button
    //                 className='btn btn-secondary m-2'
    // 			disabled
    //             >
    //                 -
    //             </button>
    //         ;
    // };
    render() {
        let counterClass = 'badge m-2 badge-';
        counterClass += this.props.counter == 0 ? 'danger' : 'warning';

        return (
            <div>
                <span className={counterClass}>{this.formatCount()}</span>
                <button
                    className='btn btn-secondary m-2'
                    onClick={() => this.props.onIncrement(this.props.counter)}
                >
                    +
                </button>
                {this.props.counter.value ? (
                    <button
                        type='button'
                        className='btn btn-secondary m-2'
                        onClick={() =>
                            this.props.onDecrement(this.props.counter)
                        }
                    >
                        -
                    </button>
                ) : (
                    <button
                        type='button'
                        className='btn btn-secondary m-2'
                        disabled
                    >
                        -
                    </button>
                )}
                <button
                    className='btn btn-danger m-2 btn-sm'
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default Counter;

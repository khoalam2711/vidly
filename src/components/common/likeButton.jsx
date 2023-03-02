import React, { Component } from 'react';
class LikeButton extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.isLiked === 1 ? (
                    // <button
                    //     className='btn btn-secondary sm'
                    //     onClick={this.props.onUnlike}
                    // >
                    //     Unlike
                    // </button>
                    <i
                        className='fa fa-heart'
                        aria-hidden='true'
                        onClick={this.props.onUnlike}
                        style={{ cursor: 'pointer' }}
                    ></i>
                ) : (
                    // <button
                    //     className='btn btn-primary sm'
                    //     onClick={this.props.onLike}
                    // >
                    //     Like
                    // </button>
                    <i
                        className='fa fa-heart-o'
                        aria-hidden='true'
                        style={{ cursor: 'pointer' }}
                        onClick={this.props.onLike}
                    ></i>
                )}
            </React.Fragment>
        );
    }
}

export default LikeButton;

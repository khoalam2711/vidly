import React, { Component } from 'react';
class LikeButton extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.isLiked == 1 ? (
                    <button
                        className='btn btn-secondary sm'
                        onClick={this.props.onUnlike}
                    >
                        Unlike
                    </button>
                ) : (
                    <button
                        className='btn btn-primary sm'
                        onClick={this.props.onLike}
                    >
                        Like
                    </button>
                )}
            </React.Fragment>
        );
    }
}

export default LikeButton;

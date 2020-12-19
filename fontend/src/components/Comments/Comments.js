import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Comments.module.css';
import Modal from '../UI/Modal/Modal';
import Comment from './Comment/Comment';
import Input from '../UI/Input/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as actions from '../../store/actions/index';

class Comments extends Component {
    state = {
        showModal: {
            id: null,
        },
        commentsInput: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Write comment...'
            },
            value: ''
        }

    }

    inputChangedHandler = (event) => {
        event.preventDefault();
        const updatedControl = {
            ...this.state.commentsInput,
            value: event.target.value
        }
        this.setState({commentsInput: updatedControl});
    }   

    addCommentHandler = (event) => {
        event.preventDefault();
        const comment = {
            body: this.state.commentsInput.value,
        }
        this.props.onAddComment(comment, this.props.postId, this.props.token)
        this.setState({commentsInput: {value: ''}})
    }

    showModalHandler = (commentId) => {
        this.setState(prevState => {
            if(prevState.showModal.id === commentId) {
                return{
                    showModal : {id:null}
                }
            }
            return {
                showModal: {id: commentId}
            }
        });
    }

    deleteCommentHandler = (commentId) => {
        this.props.onDeleteComment(this.props.postId, commentId, this.props.token)
    }


    render(){
        let comments = 'No comments to this post'
        const post = this.props.post
        if(post.comments){
            if(post.comments.length > 0){
                comments = post.comments.map(comment => (
                    <Comment
                        key={comment._id}
                        username={comment.author.username}
                        body={comment.body}
                        showDeleteButton={comment.author._id === this.props.user.id}
                        deleteComment={() => this.deleteCommentHandler(comment._id)}
                        showModal={this.state.showModal.id === comment._id}
                        modalClicked={() => this.showModalHandler(comment._id)}
                        />
                ))
            }
        }
        return(
            <Modal show={this.props.showComments} modalClosed={this.props.commentModalClick}>
                <div className={classes.Comments}>
                    {comments}
                </div>
                <form className={classes.CommentsInput} onSubmit={(event) => this.addCommentHandler(event)}>
                    <AccountCircleIcon/>
                    <Input
                        elementType={this.state.commentsInput.elementType} 
                        elementConfig={this.state.commentsInput.elementConfig}
                        value={this.state.commentsInput.value}
                        changed={(event) => this.inputChangedHandler(event)}/>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        user: state.auth.user,
        posts: state.post.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (comment, postId, token) => dispatch(actions.addComment(comment, postId, token)),
        onDeleteComment: (postId, commentId, token) => dispatch(actions.deleteComment(postId, commentId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
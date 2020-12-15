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


    render(){
        let comments = 'No comments to this post'
        const post = this.props.post
        if(post.comments){
            if(post.comments.length > 0){
                comments = post.comments.map(comment => (
                    <Comment
                        key={comment._id}
                        username={comment.author.username}
                        body={comment.body}/>
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
        posts: state.post.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (comment, postId, token) => dispatch(actions.addComment(comment, postId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
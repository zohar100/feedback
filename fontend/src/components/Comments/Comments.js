import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Comments.module.css';
import Modal from '../UI/Modal/Modal';
import Comment from './Comment/Comment';
import Input from '../UI/Input/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as actions from '../../store/actions/index';

const Comments = props => {
    const [showModal, setShowModal] = useState(null);
    const [commentsInput, setCommentsInput] = useState({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Write comment...'
        },
        value: ''
    })

    const inputChangedHandler = (event) => {
        event.preventDefault();
        const updatedControl = {
            ...commentsInput,
            value: event.target.value
        }
        setCommentsInput(updatedControl);
    }   

    const addCommentHandler = (event) => {
        event.preventDefault();
        const comment = {
            body: commentsInput.value,
        }
        props.onAddComment(comment, props.postId, props.token)
        setCommentsInput({value: ''})
    }

    const showModalHandler = (commentId) => {
        setShowModal(prevState => {
            if(prevState === commentId) {
                return null;
            }
            return commentId
        });
    }

    const deleteCommentHandler = (commentId) => {
        props.onDeleteComment(props.postId, commentId, props.token)
    }


        let comments = 'No comments to this post'
        const post = props.post
        if(post.comments){
            if(post.comments.length > 0){
                comments = post.comments.map(comment => (
                    <Comment
                        key={comment._id}
                        username={comment.author.username}
                        body={comment.body}
                        showDeleteButton={comment.author._id === props.user.id}
                        deleteComment={() => deleteCommentHandler(comment._id)}
                        showModal={showModal === comment._id}
                        modalClicked={() => showModalHandler(comment._id)}
                        />
                ))
            }
        }
        return(
            <Modal show={props.showComments} modalClosed={props.commentModalClick}>
                <div className={classes.Comments}>
                    {comments}
                </div>
                <form className={classes.CommentsInput} onSubmit={(event) => addCommentHandler(event)}>
                    <AccountCircleIcon/>
                    <Input
                        elementType={commentsInput.elementType} 
                        elementConfig={commentsInput.elementConfig}
                        value={commentsInput.value}
                        changed={(event) => inputChangedHandler(event)}/>
                </form>
            </Modal>
        )
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
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Comments.module.css';
import Comment from './Comment/Comment';
import Spinner from '../UI/Spinner/Spinner';
import CommentForm from './CommentForm/CommentForm';

const Comments = ({ deleteCommentHandler, showCommentModal,
                    showCommentModalHandler, post, comments, loading, userId,
                    showComments, bodyValue, inputValueChanged,
                    handleSubmit}) => {

        let commentsOrSpinner = <Spinner spinnerType="Primary-Spinner"/>;
        if(!loading) {
            if(comments.length >= 1){
                commentsOrSpinner = comments.map(comment => (
                    <Comment
                        key={comment._id}
                        username={comment.author.username}
                        body={comment.body}
                        showDeleteButton={comment.author._id === userId}
                        deleteComment={() => deleteCommentHandler(post._id, comment._id)}
                        showModal={showCommentModal === comment._id}
                        modalClicked={() => showCommentModalHandler(comment._id)}
                        />
                ))
            }
        }

        const animationTiming = {
            enter: 300,
            exit: 300
        }

        return(
            <CSSTransition 
            mountOnEnter
            unmountOnExit
            in={showComments}
            timeout={animationTiming}
            classNames={{
              enter: '',
              enterActive: classes.CommentsOpen,
              exit: '',
              exitActive: classes.CommentsClosed
            }}>
                <div className={classes.CommentDiv}>
                    <div className={classes.Comments}>
                        {commentsOrSpinner}
                    </div>
                    <CommentForm 
                        postId={post._id}
                        bodyValue={bodyValue}
                        inputValueChanged={inputValueChanged}
                        handleSubmit={handleSubmit}/>
                </div>
            </CSSTransition>
        )
}

export default Comments;
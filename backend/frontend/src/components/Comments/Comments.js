import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Comments.module.css';
import Comment from './Comment/Comment';
import Spinner from '../UI/Spinner/Spinner';
import CommentForm from './CommentForm/CommentForm';

const Comments = ({deleteCommentHandler, showCommentModal,
                    showCommentModalHandler, post, userId,
                    showComments, bodyValue, inputValueChanged,
                    handleSubmit, imageUrl}) => {

        let commentsOrSpan = <Spinner spinnerType="Primary-Spinner"/>;
        if(post.comments){
            if(post.comments.length > 0){
                commentsOrSpan = post.comments.map(comment => (
                    <Comment
                        key={comment._id}
                        username={comment.author.username}
                        body={comment.body}
                        showDeleteButton={comment.author._id === userId}
                        deleteComment={() => deleteCommentHandler(post._id, comment._id)}
                        showModal={showCommentModal === comment._id}
                        imageUrl={comment.author.profileImage.url}
                        modalClicked={() => showCommentModalHandler(comment._id)}
                        modalClosed={() => showCommentModalHandler(null)}
                        />
                ))
            }else {
                commentsOrSpan = <span>No comments here</span>
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
                        {commentsOrSpan}
                    </div>
                    <CommentForm
                        bodyValue={bodyValue}
                        inputChanged={inputValueChanged}
                        handleSubmit={handleSubmit}
                        imageUrl={imageUrl}/>
                </div>
            </CSSTransition>
        )
}

export default Comments;
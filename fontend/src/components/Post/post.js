import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MoreOptions from '../UI/MoreOptions/MoreOptions';
import Option from '../UI/MoreOptions/OptionsModal/Option/Option';
import classes from './Post.module.css';
import Button from '../UI/Button/Button';
import Comments from '../Comments/Comments';
import Hoc from '../../hoc/Hoc/Hoc';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const post = (props) => {
    return(
        <Hoc>
            <Comments
                showComments={props.showComments}
                commentModalClick={props.commentModalClick}
                postId={props.postId}
                post={props.post}
            />
            <div className={classes.Post}>
                <div className={classes.UserInfo}>
                    <Link to={'/profile/' + props.userId}>
                        <AccountCircleIcon/>
                    </Link>
                    <div className={classes.BasicInfo}>
                    <Link to={'/profile/' + props.userId}>
                        <p>{props.username}</p>
                    </Link>
                        <small>{props.createdAt}</small>
                    </div>
                    <div className={classes.IconPost}>
                        <MoreOptions
                        showModal={props.showModal}
                        clicked={props.modalClicked}>
                        {  props.showDeleteButton ?  <Option clicked={props.deletePost}>
                                <DeleteOutlineIcon /> Delete
                            </Option> : null}
                            <Option>
                                <StarBorderIcon/> favorite
                            </Option>
                            <Option>
                            <ErrorOutlineIcon /> Report
                            </Option>
                        </MoreOptions>
                    </div>
                </div>
                <div className={classes.UserPost}>
                    <p>
                        {props.body}
                    </p>
                    {props.image ? <img src={props.image} alt={props.image}/> : null}
                </div>
                <div className={classes.PostInfo}>
                        <span>
                            {props.commentsCount} Comments
                        </span>
                        <span>
                            {props.likesCount} Likes
                        </span>
                </div>
                <div className={classes.PostAction}>
                    <Button active={props.likeActive} clicked={props.likeClick}><ThumbUpAltIcon /> Like</Button>
                    <Button clicked={props.commentClick}><ChatBubbleOutlineIcon /> Comments</Button>
                    <Button clicked={props.addToFavorite}><ReplyIcon/> Share</Button>
                </div>
            </div>   
        </Hoc>
         
    )
}

post.propTypes = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalClicked: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired,
    showComments: PropTypes.bool.isRequired,
    commentClick: PropTypes.func.isRequired,
    commentModalClick: PropTypes.func.isRequired,
    commentsCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    likeClick: PropTypes.func.isRequired,
    likeActive: PropTypes.bool.isRequired,
    addToFavorite: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired
}

export default post;
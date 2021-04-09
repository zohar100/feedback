import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MoreOptions from '../../UI/MoreOptions/MoreOptions';
import Option from '../../UI/MoreOptions/OptionsModal/Option/Option';
import classes from './Post.module.css';
import Button from '../../UI/Button/Button';
import ProfileImage from '../../ProfileImage/ProfileImage';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const post = (props) => {
    return(
            <div className={classes.Post}>
                <div className={classes.UserInfo}>
                    <Link to={'/profile/' + props.userId}>
                        <ProfileImage imageUrl={props.profileImage.url}/>
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
                            <ErrorOutlineIcon /> Report
                            </Option>
                        </MoreOptions>
                    </div>
                </div>
                <div className={classes.PostBody}>
                    <p>
                        {props.body}
                    </p>
                    <div className={classes.PostImage}>
                        {props.image ? <img src={props.image} alt={props.image}/> : null}
                    </div>
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
                    <Button clicked={props.likeClick} active={props.likeActive}><ThumbUpAltIcon /> Like</Button>
                    <Button clicked={props.commentClick}><ChatBubbleOutlineIcon /> Comments</Button>
                    <Button clicked={props.addToFavorite} active={props.favoriteActive}><StarBorderIcon/> Favorites</Button>
                </div>
            </div>
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
    commentClick: PropTypes.func.isRequired,
    commentsCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
    likeClick: PropTypes.func.isRequired,
    likeActive: PropTypes.string,
    addToFavorite: PropTypes.func.isRequired,
    favoriteActive: PropTypes.string,
}

export default post;
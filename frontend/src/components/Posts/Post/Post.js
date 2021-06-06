import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import OptionsModal from '../../UI/OptionsModal/OptionsModal';
import classes from './Post.module.css';
import Button from '../../UI/Button/Button';
import ProfileImage from '../../ProfileImage/ProfileImage';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Post = ({showDeleteButton, deletePost, userId,
            profileImage, modalClicked, showModal, createdAt, image, 
            username, addToFavorite, commentsCount, commentClick, 
            likesCount, likeClick, likeActive, body, postOptionClicked,
            favoriteActive, post}) => {
    const postOptionList = [
        {
            text: 'Delete',
            show: showDeleteButton,
            click: deletePost,
            svgComponent: DeleteOutlineIcon
        },
        {
            text: 'Report',
            // click: deletePost,
            svgComponent: ErrorOutlineIcon
        }
    ]

    return(
            <div className={classes.Post}>
                <div className={classes.UserInfo}>
                    <div className={classes.profileImage}>
                        <Link to={'/profile/' + userId}>
                            <ProfileImage imageUrl={profileImage.url || ''}/>
                        </Link>
                    </div>
                    <div className={classes.BasicInfo}>
                        <Link to={'/profile/' + userId}>
                            <p className={classes.Username}>{username}</p>
                        </Link>
                        <small>{createdAt}</small>
                    </div>
                    <div className={classes.PostOptions}>
                        <div className={classes.OptionsIcon}>
                            <MoreVertIcon onClick={modalClicked}/>    
                        </div>
                        <OptionsModal
                        show={showModal}
                        optionList={postOptionList}
                        clicked={postOptionClicked}
                        />
                    </div>
                </div>
                <div className={classes.PostBody}>
                    <p>
                        {body}
                    </p>
                    <div className={classes.PostImage}>
                        {image ? <img src={image} alt={image}/> : null}
                    </div>
                </div>
                <div className={classes.PostInfo}>
                        <span>
                            {commentsCount} Comments
                        </span>
                        <span>
                            {likesCount} Likes
                        </span>
                </div>
                <div className={classes.PostAction}>
                    <Button 
                    clicked={likeClick} 
                    active={likeActive}><ThumbUpAltIcon/>Like</Button>
                    <Button 
                    clicked={commentClick}><ChatBubbleOutlineIcon />Comments</Button>
                    <Button 
                    clicked={addToFavorite} 
                    active={favoriteActive}><StarBorderIcon/>Favorites</Button>
                </div>
            </div>
    )
}

Post.propTypes = {
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

export default Post;
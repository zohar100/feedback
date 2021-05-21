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

const post = (props) => {
    const postOptionList = [
        {
            text: 'Delete',
            show: props.showDeleteButton,
            click: props.deletePost,
            svgComponent: DeleteOutlineIcon
        },
        {
            text: 'Report',
            // click: props.deletePost,
            svgComponent: ErrorOutlineIcon
        }
    ]

    return(
            <div className={classes.Post}>
                <div className={classes.UserInfo}>
                    <div className={classes.profileImage}>
                        <Link to={'/profile/' + props.userId}>
                            <ProfileImage imageUrl={props.profileImage.url || ''}/>
                        </Link>
                    </div>
                    <div className={classes.BasicInfo}>
                        <Link to={'/profile/' + props.userId}>
                            <p className={classes.Username}>{props.username}</p>
                        </Link>
                        <small>{props.createdAt}</small>
                    </div>
                    <div className={classes.PostOptions}>
                        <div className={classes.OptionsIcon}>
                            <MoreVertIcon onClick={props.modalClicked}/>    
                        </div>
                        <OptionsModal
                        show={props.showModal}
                        optionList={postOptionList}
                        />
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
                    <Button 
                    clicked={props.likeClick} 
                    active={props.likeActive}><ThumbUpAltIcon/>Like</Button>
                    <Button 
                    clicked={props.commentClick}><ChatBubbleOutlineIcon />Comments</Button>
                    <Button 
                    clicked={props.addToFavorite} 
                    active={props.favoriteActive}><StarBorderIcon/>Favorites</Button>
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
import React from 'react' ;
import PropTypes from 'prop-types';

import classes from './Friend.module.css';
import Button from '../../UI/Button/Button';
import ProfileImage from '../../ProfileImage/ProfileImage';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const friend = ({username, followersLength, messageButton,
                chatClicked, followClicked, userClicked, imageUrl}) => {
    return(
        <div className={classes.UserCard}>
            <div className={classes.User} onClick={userClicked}>
                <ProfileImage
                imageUrl={imageUrl}/>
                <div className={classes.UserDetails}>
                    <h3>{username}</h3>
                    <span>{followersLength} followers</span>
                </div>
            </div>
            <div className={classes.UserControls}>
                {messageButton ? 
                <Button clicked={chatClicked}><ChatBubbleIcon/></Button> :
                <Button clicked={followClicked}><PersonAddIcon/></Button> }
            </div>
        </div>
    )
}

friend.propTypes = { 
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
}

export default friend;
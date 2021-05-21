import React from 'react';

import ProfileImage from '../../ProfileImage/ProfileImage';
import Button from '../../UI/Button/Button';
import classes from './Favorite.module.css';

const Favorite = ({text, username, postImageUrl, userImageUrl }) => {

    return(
        <div className={classes.Favorite}>
                <ProfileImage
                imageUrl={postImageUrl !== null || '' ? postImageUrl : userImageUrl ? userImageUrl : ''}
                imgType={'ImageBig'}/>
            <div className={classes.FavoriteContainer}>
                <span>
                    {text}
                </span>
                <div className={classes.FavoriteUser}>
                    <ProfileImage
                    imageUrl={userImageUrl}/> 
                    <span>{username}</span>
                </div>
                <Button>Remove</Button>
                <Button>Go To Post</Button>
            </div>
        </div>
    )
}

export default Favorite;
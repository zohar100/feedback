import React from 'react';

import ProfileImage from '../../ProfileImage/ProfileImage';
import Button from '../../UI/Button/Button';
import classes from './Favorite.module.css';

const Favorite = ({text, username, postImageUrl, 
                userImageUrl, toggleFavorite, clickedToNavigate }) => {

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
                <div className={classes.FavoriteButtons}>
                    <Button clicked={toggleFavorite}>
                        Remove
                    </Button>
                    <Button clicked={clickedToNavigate}>
                        Go To Post
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Favorite;
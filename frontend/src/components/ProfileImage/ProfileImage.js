import React from 'react';

import classes from './ProfileImage.module.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ProfileImage = ({ imageUrl }) => {
    let image = <AccountCircleIcon/>
    if(imageUrl && imageUrl !== null && imageUrl !== '')
    image = <img src={imageUrl} alt='profile'/>

    return (
        <div className={classes.ProfileImage}> 
            {image}
        </div>
    )
}

export default ProfileImage;
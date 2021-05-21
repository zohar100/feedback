import React from 'react';

import classes from './ProfileImage.module.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ProfileImage = ({ imageUrl, imgType }) => {


    let image = <AccountCircleIcon/>
    if(imageUrl && imageUrl !== null && imageUrl !== '')
    image = <img src={imageUrl} alt='profile'/>

    return (
        <div className={imgType ? classes[imgType]: classes.ProfileImage}> 
            {image}
        </div>
    )
}

export default ProfileImage;
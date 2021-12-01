import React from 'react';

import ProfileImage from '../../ProfileImage/ProfileImage';
import classes from './ProfileImageSection.module.css';

const ProfileImageSection = ({profilBackground, profileImageUrl, username}) => {
    return(
    <div className={classes.ProfileImageSection} 
    style={{backgroundImage: `url(${profilBackground})`}}>
        <div >
            <ProfileImage 
            imageUrl={profileImageUrl}/>
        </div>
        <h2>
            {username}
        </h2>
    </div>
    )
}

export default ProfileImageSection;
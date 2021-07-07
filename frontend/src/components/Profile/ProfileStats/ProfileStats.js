import React from 'react';

import classes from './ProfileStats.module.css'

const ProfileStats = ({userFolowing, userFolowers, userPosts}) => (
    <div className={classes.ProfileStats}>
        <div className={classes.UserFolowing}>
            <h2>{userFolowing}</h2>
            <h3>Following</h3>
            </div>
        <div className={classes.UserFolowers}>
            <h2>{userFolowers}</h2>
            <h3>Followers</h3>
        </div>
        <div className={classes.UserPosts}>
            <h2>{userPosts}</h2>
            <h3>Posts</h3>
        </div>
    </div>
)

export default ProfileStats;
import React from 'react';

import classes from './post.module.css';
import userImg from '../../assets/images/user-def.png';

const post = (props) => {
    return(
        <div className={classes.Post}>
        <div className={classes.UserInfo}>
            <img src={userImg} alt='image1'/>
            <div>
            <p>{props.username}</p>
            <small>time ago</small>
            </div>
        </div>
        <div className={classes.UserPost}>
            <h3>{props.title}</h3>
            <p>
                {props.body}
            </p>
        </div>
        <div className={classes.PostInfo}>

        </div>
        </div>            
    )
}

export default post;
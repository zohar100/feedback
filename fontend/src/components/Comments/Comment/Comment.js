import React from 'react';

import classes from './Comment.module.css';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const comment = (props) => {
    return(
        <div className={classes.Comment}>
            <div className={classes.CommentImage}>
                <AccountCircleIcon/>
            </div>
            <div className={classes.CommentBody}>
                <h3>{props.username}</h3>
                <p>{props.body}</p>
            </div>
        </div>
    )
}

export default comment;
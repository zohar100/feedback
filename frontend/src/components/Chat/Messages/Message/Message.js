import React from 'react';


import classes from './Message.module.css';

const Message = ({text, name, currentUser}) => {
    return(
        currentUser === true 
        ? (
            <div className={classes.MessageBlue}>
                <p className={classes.RightName}>{name}</p>
                <div className={classes.TextContainer}>
                    <p className={classes.Text}>{text}</p>
                </div>
            </div>
        ) : (
            <div className={classes.MessageDark}>
                <div className={classes.TextContainer}>
                    <p className={classes.Text}>{text}</p>
                </div>
                <p className={classes.RightName}>{name}</p>
            </div>
        )
    )
}

export default Message;
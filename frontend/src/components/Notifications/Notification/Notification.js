import React from 'react';

import ProfileImage from '../../ProfileImage/ProfileImage';
import classes from './Notification.module.css';

import Moment from 'react-moment';

const Notification = ({text, createdAt, clicked, imageUrl}) => {
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };  
    return(
        <div className={classes.Notification} onClick={clicked}>
            <div className={classes.Image}>
                <ProfileImage imageUrl={imageUrl}/>
            </div>
            <div className={classes.NotificationContent}>
                <span className={classes.NotificationText}>
                    {text}
                </span>
            
                <span className={classes.NotificationDate}>
                    <Moment
                    calendar={calendarStrings}>{createdAt}</Moment>
                </span>
            </div>
        </div>
    )
}

export default Notification;
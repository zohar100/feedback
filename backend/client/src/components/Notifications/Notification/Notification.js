import React from 'react';

import ProfileImage from '../../ProfileImage/ProfileImage';
import Button from '../../UI/Button/Button';
import classes from './Notification.module.css';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Moment from 'react-moment';

const Notification = ({text, createdAt, clicked, imageUrl,deleteNotification}) => {
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };  
    return(
        <div className={classes.Notification}>
            <div className={classes.Image}>
                <ProfileImage imageUrl={imageUrl}/>
            </div>
            <div className={classes.NotificationContent} onClick={clicked}>
                <span className={classes.NotificationText}>
                    {text}
                </span>
            
                <span className={classes.NotificationDate}>
                    <Moment
                    calendar={calendarStrings}>{createdAt}</Moment>
                </span>
            </div>
            <div className={classes.NotificationDelete}>
                <Button clicked={deleteNotification}>
                    <DeleteOutlineIcon/>
                </Button>
            </div>
        </div>
    )
}

export default Notification;
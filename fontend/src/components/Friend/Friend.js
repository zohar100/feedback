import React from 'react' ;
import PropTypes from 'prop-types';

import classes from './Friend.module.css';
import Button from '../UI/Button/Button';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const friend = (props) => {
    return(
        <div className={classes.UserCard}>
            <div className={classes.UserImage}>
                <AccountCircleIcon/>
                <h3>{props.username}</h3>
            </div>
            <div className={classes.UserInfo}>
                    <p><span>From:</span> {props.city}</p>
                    <p><span>Studies at:</span> {props.study}</p>
                    <p><span>Work at:</span> {props.work}</p>
            </div>
            <div className={classes.UserControls}>
                <Button>Add friend</Button>
                <Button>Message</Button>
            </div>
        </div>
    )
}

friend.propTypes = { 
    username: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
    work: PropTypes.string.isRequired,
}

export default friend;
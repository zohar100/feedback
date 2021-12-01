import React from 'react';

import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const navigationitems = (props) => {
    return(
        <ul className={classes.NavigationItems} onClick={props.clicked}>
            <NavigationItem link={'/profile/' + props.userId}>
                <AccountCircleIcon /> {props.username}
            </NavigationItem>
            <NavigationItem link='/' exact>
                <SettingsIcon /> Setting
            </NavigationItem>
            <NavigationItem link='/favorites'>
                <LogoutIcon /> Logout
            </NavigationItem>
        </ul>
    )
}

export default navigationitems;
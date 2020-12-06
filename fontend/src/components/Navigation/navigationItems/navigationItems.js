import React from 'react';

import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';

const navigationitems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/profile'>
                <AccountCircleIcon /> {props.username}
            </NavigationItem>
            <NavigationItem link='/' exact>
                <HomeIcon /> Home
            </NavigationItem>
            <NavigationItem link='/favorites'>
                <StarIcon /> Favorite
            </NavigationItem>
        </ul>
    )
}

export default navigationitems;
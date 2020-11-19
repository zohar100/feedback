import React from 'react';

import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';

const navigationitems = () => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact>Home</NavigationItem>
            <NavigationItem link='/posts'>Posts</NavigationItem>
            <NavigationItem link='/profile'>Profile</NavigationItem>
        </ul>
    )
}

export default navigationitems;
import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.clicked}/>
            <Logo/>
        </header>
    )
}

export default toolbar
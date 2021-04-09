import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './navigationItem.module.css';

const navigationitem = ( {link, exact, clicked, children} ) => {
    return(
        <li className={classes.NavigationItem}>
            <NavLink 
            to={link}         
            exact={exact}
            activeClassName={classes.active}
            onClick={clicked}> {children} </NavLink>
        </li>
    )
}

export default navigationitem;
import React from 'react';

import classes from './sideMenu.module.css';
import NavigationItems from '../navigationItems/navigationItems';
import Hoc from '../../../hoc/Hoc/Hoc';

const sidemenu = (props) => {
    return(
        <Hoc>
            <div className={classes.SideMenu}>
                <NavigationItems/>
            </div>
        </Hoc>
    )
};

export default sidemenu;
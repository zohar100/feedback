import React from 'react';

import NavigationItems from '../navigationItems/navigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Hoc from '../../../hoc/Hoc/Hoc';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Hoc>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <NavigationItems 
            username={props.username}
            userId={props.userId}/>
        </div>
        </Hoc>
    );
}

export default sideDrawer;
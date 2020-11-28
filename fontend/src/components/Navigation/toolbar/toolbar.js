import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.clicked}/>
            <Logo/>
            <div className={classes.UserInfo}>
                <span><AccountCircleIcon/> Username</span>
                <Button>   
                    <ExpandMoreIcon/>
                </Button>
            </div>
        </header>
    )
}

export default toolbar
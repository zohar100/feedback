import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';
import OptionsModal from '../../UI/MoreOptions/OptionsModal/OptionsModal';
import Option from '../../UI/MoreOptions/OptionsModal/Option/Option';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <Logo/>
            <div className={classes.UserInfo}>
                <Button clicked={props.clickToShowModal}>
                <AccountCircleIcon/>
                <span> {props.username} </span>
                    <ExpandMoreIcon/>
                </Button>
                <OptionsModal showModal={props.showUserModal}> 
                    <Option>Profile</Option>
                    <Option>Setting</Option>
                    <Option>Help</Option>
                    <Option clicked={props.logout}>Logout</Option>
                </OptionsModal>
            </div>
            <DrawerToggle clicked={props.clicked}/>
        </header>
    )
}

export default toolbar
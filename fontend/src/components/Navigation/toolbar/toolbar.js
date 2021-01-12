import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';
import OptionsModal from '../../UI/MoreOptions/OptionsModal/OptionsModal';
import Option from '../../UI/MoreOptions/OptionsModal/Option/Option';
import NavigationItem from '../navigationItems/navigationItem/navigationItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';


const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <Logo/>
            <div className={classes.Navigation}>
                <ul>
                    <NavigationItem link='/' exact>
                        <HomeIcon />
                    </NavigationItem>
                    <NavigationItem link='/favorites'>
                        <StarIcon />
                    </NavigationItem>
                </ul>
            </div>
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
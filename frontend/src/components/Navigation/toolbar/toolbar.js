import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';
import OptionsModal from '../../UI/OptionsModal/OptionsModal';
import NavigationItem from '../navigationItems/navigationItem/navigationItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';

const toolbar = ({showUserModal, logout, clicked, clickToShowModal, username}) => {
    const optionList = [
        {
            text: 'Profile'
        },
        {
            text: 'Setting'
        },
        {
            text: 'Logout',
            click: logout
        }
    ]
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
                    <NavigationItem link='/search'>
                        <SearchIcon />
                    </NavigationItem>
                </ul>
            </div>
            <div className={classes.UserInfo}>
                <Button clicked={clickToShowModal}>
                <AccountCircleIcon/>
                <span> {username} </span>
                    <ExpandMoreIcon/>
                </Button>
                <OptionsModal 
                show={showUserModal} 
                optionList={optionList}/>
            </div>
            <DrawerToggle clicked={clicked}/>
        </header>
    )
}

export default toolbar
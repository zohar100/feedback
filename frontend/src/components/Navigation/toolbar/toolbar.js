import React from 'react';

import classes from './toolbar.module.css';
import Logo from '../../Logo/Logo';
import Button from '../../UI/Button/Button';
import DrawerToggle from '../sideDrawer/DrawerToggle/DrawerToggle';
import OptionsModal from '../../UI/OptionsModal/OptionsModal';
import NavigationItem from '../navigationItems/navigationItem/navigationItem';
import Notification from '../../Notifications/Notification/Notification';
import ProfileImage from '../../ProfileImage/ProfileImage';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

const toolbar = ({showUserModal, logout, clicked, username, profileImageUrl,
                    clickToShowModal, userOptionClicked, clickToShowNotifications,
                    showNotificationsModal, userNotificationsClicked, 
                    profileNavigation, notifications, notificationClicked}) => {
    const optionList = [
        {
            text: 'Profile',
            svgComponent: PersonIcon,
            click: profileNavigation
        },
        {
            text: 'Setting',
            svgComponent: SettingsIcon
        },
        {
            text: 'Logout',
            svgComponent: ExitToAppIcon,
            click: logout
        }
    ]
    return(
        <header className={classes.Toolbar}>
            <Logo/>
            <div className={classes.Notifications}>
                    <div className={classes.NotificationButton}>
                        <Button clicked={clickToShowNotifications} active={showNotificationsModal}>
                            <NotificationsIcon/>
                        </Button>
                    </div>
                    <OptionsModal
                        show={showNotificationsModal}
                        clicked={userNotificationsClicked}
                        secondarySize
                        >   
                        {notifications.map(n => (
                            <Notification
                            key={n._id}
                            text={n.text}
                            createdAt={n.createdAt}
                            clicked={() => notificationClicked(n.navigationId, n.kind)}
                            imageUrl={n.imageUrl}/>
                        ))}
                    </OptionsModal>
            </div>
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
                <div className={classes.UserButton}>
                    <Button clicked={clickToShowModal}>
                        <ProfileImage imageUrl={profileImageUrl} imgType={'ImageSmall'}/>
                        <span> {username} </span>
                        <ExpandMoreIcon/>
                    </Button>
                </div>
                <OptionsModal 
                show={showUserModal}
                clicked={userOptionClicked}
                optionList={optionList}/>
            </div>
            <DrawerToggle clicked={clicked}/>
        </header>
    )
}

export default toolbar
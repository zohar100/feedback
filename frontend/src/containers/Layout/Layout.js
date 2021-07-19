import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Hoc from '../../hoc/Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import ChatsList from '../../components/ChatsList/ChatsList';
import * as actions from '../../store/actions/index';

const Layout = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {token, user} = useSelector(state => state.auth);
    const chats = useSelector(state => state.chat.chats);
    
    const [showUserModal, setShowUserModal] = useState(false);
    const [showNotificationsModal, setShowNotificationsModal] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const {fetchChats, authLogout} = actions;

    useEffect(() => {
    if(token && user.id){
            dispatch(fetchChats(user.id, token))
    }
    }, [user, token, fetchChats, dispatch])

    const showUserModalHandler = () => {
        setShowUserModal(!showUserModal);
    }

    const showNotificationsModalHandler = () => {
        setShowNotificationsModal(!showNotificationsModal);
    }

    const notificationClicked = (navigateId, type) => {
        switch(type){
            case 'CHAT_MESSAGE':
                return history.push('/chats/' + navigateId)
            case 'POST_LIKE':
                return history.push('/posts/' + navigateId)
            case 'POST_COMMENT':
                return history.push('/posts/' + navigateId)
            case 'USER_FOLLOW':
                return history.push('/profile/' + navigateId)
            default: return null;
        }
    }   

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    const profileHandler = () => {
        history.push('/profile/' + user.id)
    }

    const chatClicked = (id) => {
        history.push('/chats/' + id)
    }

    const logoutHandler = () => {
        dispatch(authLogout())
    }
    return (
        token !== null ? 
        <Hoc>
            <Toolbar 
                clicked={sideDrawerOpenHandler} 
                username={user.username}
                profileImageUrl={user.id ? user.profileImage.url : ''}
                showUserModal={showUserModal}
                userOptionClicked={showUserModalHandler}
                clickToShowModal={showUserModalHandler}
                showNotificationsModal={showNotificationsModal}
                userNotificationsClicked={showNotificationsModalHandler}
                clickToShowNotifications={showNotificationsModalHandler}
                notifications={user.notifications}
                notificationClicked={notificationClicked}
                profileNavigation={profileHandler}
                logout={logoutHandler}/>
            <SideDrawer 
                open={showSideDrawer} 
                username={user.username} 
                closed={sideDrawerClosedHandler}
                userId={user.id}/>
            <main className={classes.Layout}>
                <div className={classes.RightBar}>
                    <ChatsList 
                    chats={chats}
                    user={user}
                    chatClicked={chatClicked}/>
                </div>
                <div className={classes.Main}>
                    {props.children}
                </div>
            </main>
        </Hoc> : props.children
    )
}




export default Layout;
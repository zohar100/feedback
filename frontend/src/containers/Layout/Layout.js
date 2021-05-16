import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Hoc from '../../hoc/Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import ChatsList from '../../components/Chats/Chats';
import Chat from '../Chat/Chat';
import * as actions from '../../store/actions/index';

const Layout = props => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    const chats = useSelector(state => state.chat.chats);
    const chat = useSelector(state => state.chat.chat);
    
    const [showUserModal, setShowUserModal] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const {fetchChats, fetchChat, authLogout} = actions;

    useEffect(() => {
    if(token && user.id){
            dispatch(fetchChats(user.id, token))
    }
    }, [user, token, fetchChats, dispatch])

    const showUserModalHandler = () => {
        setShowUserModal(!showUserModal);
    }

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    const logoutHandler = () => {
        dispatch(authLogout())
    }

    const onClickedChat = (chatId) => {
        dispatch(fetchChat(chatId, token));
        console.log(chat);
    }

        let layout = (
            <Hoc>
                <Toolbar 
                clicked={sideDrawerOpenHandler} 
                username={user.username}
                showUserModal={showUserModal}
                clickToShowModal={showUserModalHandler}
                logout={logoutHandler}/>
                <SideDrawer 
                open={showSideDrawer} 
                username={user.username} 
                closed={sideDrawerClosedHandler}
                userId={user.id}/>
            </Hoc>
        );
        if (!props.show) {
            layout = null
        }
    return (
        <Hoc>
            {layout}
            <main className={classes.Layout}>
                <div className={classes.RightBar}>
                    <ChatsList 
                    chats={chats}
                    user={user}
                    chatClicked={onClickedChat}/>
                    <Chat/>
                </div>
                <div className={classes.Main}>
                    {props.children}
                </div>
            </main>
        </Hoc>
    )
}




export default Layout;
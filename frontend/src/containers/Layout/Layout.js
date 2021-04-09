import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Hoc from '../../hoc/Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import ChatsList from '../../components/Chats/Chats';
import Chat from '../Chat/Chat';
import * as actions from '../../store/actions/index';

const Layout = props => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const {user, token, onFetchChats} = props;

    useEffect(() => {
    if(token && user.id){
            onFetchChats(user.id, token)
    }
    }, [user, token, onFetchChats,])

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
        props.onAuthLogout();
    }

    const onClickedChat = (chatId) => {
        props.onFetchChat(chatId, props.token);
        console.log(props.chat);
    }

        let layout = (
            <Hoc>
                <Toolbar 
                clicked={sideDrawerOpenHandler} 
                username={props.user.username}
                showUserModal={showUserModal}
                clickToShowModal={showUserModalHandler}
                logout={logoutHandler}/>
                <SideDrawer 
                open={showSideDrawer} 
                username={props.user.username} 
                closed={sideDrawerClosedHandler}
                userId={props.user.id}/>
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
                    chats={props.chats}
                    user={props.user}
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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        chats: state.chat.chats,
        chat: state.chat.chat,
        socket: state.chat.socket
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout: () => dispatch(actions.authLogout()),
        onFetchChats: (userId, token) => dispatch(actions.fetchChats(userId, token)),
        onFetchChat: (chatId, token) => dispatch(actions.fetchChat(chatId, token)),
        onSetSocket: (socket) => dispatch(actions.setSocket(socket))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Layout);
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Hoc from '../Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import ChatSideBar from '../../components/Chat/SideBar/SideBar';
import * as actions from '../../store/actions/index';

const Layout = props => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [showSideDrawer, setShowSideDrawer] = useState(false);

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
                <div className={classes.RightBar}><ChatSideBar/></div>
                <div className={classes.Main}>
                    {props.children}
                </div>
            </main>
        </Hoc>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout: () => dispatch(actions.authLogout())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Layout);
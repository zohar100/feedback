import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hoc from '../Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import SideMenu from '../../components/Navigation/sideMenu/sideMenu';
import ChatSideBar from '../../components/Chat/SideBar/SideBar';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state ={
        showUserModal: false,
        showSideDrawer: false,
        show: true
    }

    showUserModalHandler = () => {
        this.setState((prevState) => {
            return {showUserModal: !prevState.showUserModal}
        })
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawer: !prevState.showSideDrawer}
        })
    }

    logoutHandler = () => {
        this.props.onAuthLogout();
    }

    render() {
        let layout = (
            <Hoc show={this.props.show}>
                <Toolbar 
                clicked={this.sideDrawerOpenHandler} 
                username={this.props.user.username}
                showUserModal={this.state.showUserModal}
                clickToShowModal={this.showUserModalHandler}
                logout={this.logoutHandler}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                username={this.props.user.username} 
                closed={this.sideDrawerClosedHandler}
                userId={this.props.user.id}/>
                <SideMenu 
                username={this.props.user.username}
                userId={this.props.user.id}/>
                <ChatSideBar/>
            </Hoc>
        );
        if (!this.props.show) {
            layout = null
        }
    return (
        <Hoc>
            {layout}
            <main className={classes.Layout}>
                {this.props.children}
            </main>
        </Hoc>
    )
    }
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
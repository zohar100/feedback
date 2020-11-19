import React, { Component } from 'react';

import Hoc from '../Hoc/Hoc';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/toolbar/toolbar';
import SideDrawer from '../../components/Navigation/sideDrawer/SideDrawer';
import SideMenu from '../../components/Navigation/sideMenu/sideMenu';

class Layout extends Component {
    state ={
        showSideDrawer: false,
        show: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return{showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        let layout = (
            <Hoc show={this.props.show}>
                <Toolbar clicked={this.sideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <SideMenu/>
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

export default Layout;
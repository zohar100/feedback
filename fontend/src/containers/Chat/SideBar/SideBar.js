import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import classes from './SideBar.module.css';
import * as actions from '../../../store/actions/index';

let socket;

const SideBar = (props) => {
    const { token } = props

    useEffect(() => {
      if(token !== null){
        socket = io.connect( 'http://localhost:5000', {
          query: { token: token }
        });
      }
        
    }, [token])
    return(
        <div className={classes.SideBar}>
          <h3>Chat</h3>
            
        </div>
    )
}

const mapStateToProps = state => {
  return {
      user: state.auth.user,
      token: state.auth.token
  }
} 

const mapDispatchToProps = dispatch => {
  return {
      onAuthLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
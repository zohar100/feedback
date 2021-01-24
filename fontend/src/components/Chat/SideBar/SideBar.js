import React, { useEffect } from 'react';
import io from 'socket.io-client';

import classes from './SideBar.module.css';

let socket;

const SideBar = (props) => {
    useEffect(() => {
        socket = io( 'http://localhost:5000', {
            transports: ['websocket', 'polling', 'flashsocket'],
            transportOptions: {
              polling: {
                extraHeaders: {
                  "my-custom-header": "abcd"
                }
              }
            }
          });
          socket.emit('connected', {name: 'Zohar', room: '1234'}, ()=> {})
    })
    return(
        <div className={classes.SideBar}>
            
        </div>
    )
}

export default SideBar;
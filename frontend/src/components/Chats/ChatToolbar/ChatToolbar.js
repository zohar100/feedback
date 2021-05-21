import React from 'react';

import classes from './ChatToolbar.module.css';

const ChatToolbar = () => (
    <div className={classes.ChatToolbar}>
        <ul>
            <li className={classes.active}>
                <p>Chats</p>
            </li>
            <li>
                <p>Groups</p>
            </li>
        </ul>
    </div>
)

export default ChatToolbar;
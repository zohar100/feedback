import React from 'react';

import classes from './Option.module.css';

const option = (props) => (
    <li className={classes.Option}>
        <button onClick={props.clicked}>
            {props.children}
        </button>
    </li>
)

export default option;
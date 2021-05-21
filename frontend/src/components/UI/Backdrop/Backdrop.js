import React from 'react';

import classes from './Backdrop.module.css';

const backDrop = (props) => (
    props.show ? 
    <div 
    onClick={props.clicked} 
    className={props.clearColor ? classes.ClearBackdrop : classes.Backdrop}>
    </div>  : null
);

export default backDrop;
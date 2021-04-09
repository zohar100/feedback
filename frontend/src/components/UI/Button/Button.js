import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    const buttonClasses = [classes.Button]
    if(props.active){
        buttonClasses.push(classes.active)
    }
    return(
        <button className={[buttonClasses.join(' '), classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
            {props.children}
        </button>
    )
}

export default button;
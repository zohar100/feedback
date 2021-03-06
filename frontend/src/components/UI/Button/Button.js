import React from 'react';

import classes from './Button.module.css';

const button = ({active, children, btnType, svgComponent, clicked}) => {
    const buttonClasses = [classes.Button]
    if(active){
        buttonClasses.push(classes.active)
    }
    return(
        <button 
        className={[buttonClasses.join(' '), classes[btnType]].join(' ')}
        onClick={clicked}>
            {svgComponent ? svgComponent : null}
            {children}
        </button>
    )
}

export default button;
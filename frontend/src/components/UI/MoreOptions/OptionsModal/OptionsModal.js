import React from 'react';

import classes from './OptionsModal.module.css';

const optionsModal = (props) => {
    return (
        <div className={classes.OptionModal} 
        style={{
            visibility: props.showModal ? 'visible' : 'hidden',
            opacity: props.showModal ? '1' : '0',
        }}>
            <ul>
            {props.children}
            </ul>
        </div>
    )
}

export default optionsModal;
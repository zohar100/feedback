import React from 'react';

import classes from './MoreOptions.module.css';

const moreOptions = (props) => {
    return (
            <div className={classes.MoreOptions}>
                <div className={classes.Icon} onClick={props.clicked}>
                    <div >
                    </div>
                </div>
                <div className={classes.OptionModal} 
                style={{
                    opacity: props.showModal ? '1' : '0'
                }}>
                    {props.children}
                </div>
            </div>
    )
}

export default moreOptions;
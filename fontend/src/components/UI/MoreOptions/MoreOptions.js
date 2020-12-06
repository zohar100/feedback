import React from 'react';

import classes from './MoreOptions.module.css';
import OptionsModal from './OptionsModal/OptionsModal';

const moreOptions = (props) => {
    return (
        <div className={classes.MoreOptions}>
            <div className={classes.Icon} onClick={props.clicked}>
                <div >
                </div>
            </div>
            <OptionsModal showModal={props.showModal}> 
                {props.children}
            </OptionsModal>
        </div>
    )
}

export default moreOptions;
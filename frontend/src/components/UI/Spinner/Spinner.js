import React from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => {
    return(
        <div className={classes[props.spinnerType] }>
        </div>
    )
}

export default spinner;
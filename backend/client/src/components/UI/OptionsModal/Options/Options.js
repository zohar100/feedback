import React from 'react';

import Button from '../../Button/Button';
import classes from './Options.module.css';

const Options = ({options}) => (
    <div className={classes.Options}>
        {options.map(option => (
                option.show === false 
                ? null :
                <Button 
                btnType={'OptionBtn'} 
                clicked={option.click}
                svgComponent={option.svgComponent ? <option.svgComponent/> : null}>
                {option.text}
                </Button>  
        ))}
    </div>
);

export default Options;
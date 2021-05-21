import React from 'react';

import Button from '../../Button/Button';

const Options = ({options}) => (
    options.map(option => (
            option.show === false 
            ? null :
            <Button 
            btnType={'OptionBtn'} 
            clicked={option.click}
            svgComponent={option.svgComponent ? <option.svgComponent/> : null}>
            {option.text}
            </Button>  
    ))
);

export default Options;
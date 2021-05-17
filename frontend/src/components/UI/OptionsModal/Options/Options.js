import React from 'react';

import Button from '../../Button/Button';

const Options = ({options}) => (
    options.map(option => (
            option.show === false 
            ? null :
            <Button btnType={'OptionBtn'} clicked={option.click}>
            {option.svgComponent ? <option.svgComponent/> : null} 
            <p>{option.text}</p>
            </Button>  
    ))
);

export default Options;
import React from 'react';

import classes from './Input.module.css';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                            className={classes.InputElement} 
                            { ...props.elementConfig } 
                            value={props.value}
                            onChange={props.changed} />
            break;
        case('textarea'):
            inputElement = <textarea 
                            className={classes.InputElement} 
                            { ...props.elementConfig } 
                            value={props.value}
                            onChange={props.changed} />
            break;
        case('select'):
        inputElement = (
            <select
                className={classes.InputElement} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option 
                        value={option.value}
                        key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        )
            break;
        default:
            inputElement = <input 
                            className={classes.InputElement}
                            { ...props.elementConfig } 
                            value={props.value}
                            onChange={props.changed} />
    }

    let icon = null;
    switch(props.icon){
        case 'Username': icon = <PersonIcon />
        break;
        case 'Password': icon = <LockIcon />
        break;
        default: icon = null;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <div className={[classes.DivInput, inputClasses.join(' ')].join(' ')}>
            {icon} {inputElement}
            </div>
            {validationError}
        </div>
    )
}

export default input;
import React from 'react';
import Hoc from '../../../hoc/Hoc/Hoc';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => (
    <Hoc>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div 
    className={classes.Modal}
    style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}>
        {props.children}
    </div>
    </Hoc>
);

export default modal;
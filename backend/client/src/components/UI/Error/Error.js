import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Error.module.css';


const animationTiming = {
    enter: 300,
    exit: 300
  }


const Error = ({message, show}) => {
    return (
        <CSSTransition 
        mountOnEnter
        unmountOnExit
        in={show}
        timeout={animationTiming}
        classNames={{
          enter: '',
          enterActive: classes.ErrorOpen,
          exit: '',
          exitActive: classes.ErrorClosed
        }}>
            <div className={classes.Error}>
                {message}
            </div>
        </CSSTransition>
    )
}

export default Error;
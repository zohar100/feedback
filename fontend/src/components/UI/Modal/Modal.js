import React from 'react';
import Hoc from '../../../hoc/Hoc/Hoc';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Modal.module.css';

const animationTiming = {
    enter: 300,
    exit: 300
  }

const modal = (props) => (
    <Hoc>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <CSSTransition 
    mountOnEnter
    unmountOnExit
    in={props.show}
    timeout={animationTiming}
    classNames={{
      enter: '',
      enterActive: classes.ModalOpen,
      exit: '',
      exitActive: classes.ModalClosed
    }}>
    <div 
    className={classes.Modal}>
        {props.children}
    </div>
    </CSSTransition>
    </Hoc>
);

export default modal;
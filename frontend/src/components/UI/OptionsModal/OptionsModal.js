import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Options from './Options/Options';
import classes from './OptionsModal.module.css';

const animationTiming = {
    enter: 300,
    exit: 300
  }

const OptionsModal = ({show, clicked, optionList}) => {
    return(
    <CSSTransition 
    mountOnEnter
    unmountOnExit
    in={show}
    timeout={animationTiming}
    classNames={{
      enter: '',
      enterActive: classes.OptionsModalOpen,
      exit: '',
      exitActive: classes.OptionsModalClosed 
    }}>
      <div className={classes.OptionsModal}>
          <Options
          options={optionList}/>
      </div>
    </CSSTransition>
    )
}

export default OptionsModal;
import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Hoc from '../../../hoc/Hoc/Hoc';
import Options from './Options/Options';
import Backdrop from '../Backdrop/Backdrop';
import classes from './OptionsModal.module.css';

const animationTiming = {
    enter: 300,
    exit: 300
  }

const OptionsModal = ({show, clicked, optionList}) => {
    return(
      <Hoc>
        <Backdrop clearColor show={show} clicked={clicked}/>
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
      </Hoc>
    )
}

export default OptionsModal;
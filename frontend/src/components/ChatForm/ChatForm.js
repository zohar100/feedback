import React from 'react';

import classes from './ChatForm.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import SendIcon from '@material-ui/icons/Send';
  

const ChatForm = ({formValue, formChange, handleSubmit}) => {
    return(
    <div className={classes.ChatForm}>
        <form>   
            <Input
            elementType='input' 
            elementConfig={{type: 'text', placeholder: 'Send message...', name: 'text'}}
            value={formValue || ''}
            changed={formChange}/>
            <Button clicked={handleSubmit}><SendIcon/></Button>
        </form>
    </div>
    )
}

export default ChatForm;
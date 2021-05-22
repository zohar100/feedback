import React from 'react';

import Input from '../../UI/Input/Input';
import classes from './CommentForm.module.css';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const CommentForm = ({bodyValue, handleSubmit, inputChanged}) => {

    return (
        <form className={classes.CommentsInput} onSubmit={handleSubmit}>
            <AccountCircleIcon/>
            <Input
                elementType={'input'} 
                elementConfig={{type: 'text', placeholder: 'Write comment...', name: 'body'}}
                value={bodyValue || ""}
                changed={inputChanged}/>
        </form>
    )
}

export default CommentForm;
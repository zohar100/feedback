import React from 'react';

import Input from '../../UI/Input/Input';
import classes from './CommentForm.module.css';
import ProfileImage from '../../ProfileImage/ProfileImage';

const CommentForm = ({bodyValue, handleSubmit, inputChanged, imageUrl}) => {

    return (
        <form className={classes.CommentsInput} onSubmit={handleSubmit}>
            <ProfileImage imageUrl={imageUrl}/>
            <Input
                elementType={'input'} 
                elementConfig={{type: 'text', placeholder: 'Write comment...', name: 'body'}}
                value={bodyValue || ""}
                changed={inputChanged}/>
        </form>
    )
}

export default CommentForm;
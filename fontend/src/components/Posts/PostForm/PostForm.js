import React from 'react';

import classes from './PostForm.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';


const PostForm = ({ bodyValue, imageValue, 
                    inputValueChanged, submitHandler, 
                    currentUser }) => {
        let form = (
            <>
            <Input
                elementType='input' 
                elementConfig={{type: 'text', placeholder: 'What you think...', name: 'body'}}
                value={bodyValue}
                changed={inputValueChanged}/>
            <Input
                elementType='input' 
                elementConfig={{type: 'text', placeholder: 'image...', name: 'image'}}
                value={imageValue}
                changed={inputValueChanged}/>
            </>
            )

        return(
            <div className={classes.AddPost}>
                <div>
                    <AccountCircleIcon/>
                    <p>{currentUser.username}</p>
                </div>
                <form>
                    <div className={classes.Inputs}>
                        {form}
                    </div>
                    <Button clicked={submitHandler}><PostAddIcon/> Post</Button>
                </form>
            </div>
        )
}

export default PostForm;
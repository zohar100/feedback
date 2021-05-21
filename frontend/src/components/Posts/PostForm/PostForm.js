import React from 'react';

import classes from './PostForm.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ProfileImage from '../../ProfileImage/ProfileImage';

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
                <div className={classes.UserInfo}>
                    <ProfileImage imageUrl={currentUser.profileImage.url}/>
                    <p>{currentUser.username}</p>
                </div>
                <form>
                    <div className={classes.Inputs}>
                        {form}
                    </div>
                    <Button 
                    clicked={submitHandler}><PostAddIcon/>Post</Button>
                </form>
            </div>
        )
}

export default PostForm;
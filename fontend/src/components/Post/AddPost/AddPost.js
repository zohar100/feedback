import React from 'react';

import classes from './AddPost.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';


const addPost = (props) => {
    const elementConfig = {
        postBody: {
            type: 'text',
            placeholder: 'Whats you think?'
        },
        postImage: {
            type: 'text',
            placeholder: 'Add image'
        }
    }

    return(
        <div className={classes.AddPost}>
            <div>
                <AccountCircleIcon/>
                <p>Username</p>
            </div>
            <form>
                <div className={classes.Inputs}>
                    <div className={classes.BodyInput}>
                        <Input 
                        elementConfig={elementConfig.postBody}/>
                    </div>
                    <div className={classes.ImageInput}>
                        <Input 
                        elementConfig={elementConfig.postImage}/>
                    </div>
                </div>
                <Button><PostAddIcon/> Post</Button>
            </form>
        </div>
    )
}

export default addPost;
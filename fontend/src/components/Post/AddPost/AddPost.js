import React from 'react';

import classes from './AddPost.module.css';
import Button from '../../UI/Button/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';


const addPost = (props) => {

    return(
        <div className={classes.AddPost}>
            <div>
                <AccountCircleIcon/>
                <p>{props.username}</p>
            </div>
            <form>
                {props.children}
                <Button clicked={ props.addPost}><PostAddIcon/> Post</Button>
            </form>
        </div>
    )
}

export default addPost;
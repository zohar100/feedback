import React from 'react';

import MoreOptions from '../UI/MoreOptions/MoreOptions';
import Option from '../UI/MoreOptions/OptionsModal/Option/Option';
import classes from './Post.module.css';
import Button from '../UI/Button/Button';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const post = (props) => {
    return(
        <div className={classes.Post}>
            <div className={classes.UserInfo}>
                <AccountCircleIcon/>
                <div className={classes.BasicInfo}>
                    <p>{props.username}</p>
                    <small>{props.createdAt}</small>
                </div>
                <div className={classes.IconPost}>
                    <MoreOptions
                    showModal={props.showModal}
                    clicked={props.clicked}>
                    {  props.showDeleteButton ?  <Option clicked={props.deletePost}>
                            <DeleteOutlineIcon /> Delete
                        </Option> : null}
                        <Option>
                            <StarBorderIcon/> favorite
                        </Option>
                        <Option>
                           <ErrorOutlineIcon /> Report
                        </Option>
                    </MoreOptions>
                </div>
            </div>
            <div className={classes.UserPost}>
                <p>
                    {props.body}
                </p>
            </div>
            <div className={classes.PostInfo}>
                    <span>
                        14 Comments
                    </span>
                    <span>
                        56 Likes
                    </span>
            </div>
            <div className={classes.PostAction}>
                <Button><ThumbUpAltIcon /> Like</Button>
                <Button><ChatBubbleOutlineIcon /> Comments</Button>
                <Button><ReplyIcon/> Share</Button>
            </div>
        </div>            
    )
}

export default post;
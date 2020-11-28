import React from 'react';

import userImg from '../../assets/images/user-def.png';
import MoreOptions from '../UI/MoreOptions/MoreOptions';
import classes from './post.module.css';
import Button from '../UI/Button/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const post = (props) => {
    return(
        <div className={classes.Post}>
            <div className={classes.UserInfo}>
                <AccountCircleIcon/>
                <div className={classes.BasicInfo}>
                    <p>{props.username}</p>
                    <small>time ago</small>
                </div>
                <div className={classes.IconPost}>
                    <MoreOptions
                    showModal={props.showModal}
                    clicked={props.clicked}>
                        <ul>
                            <li>
                                <button onClick={props.deletePost}>Delete</button>
                            </li>
                            <li>
                                <button>Add to favorites</button>
                            </li>
                            <li>
                                <button>Report</button>
                            </li>
                        </ul>
                    </MoreOptions>
                </div>
            </div>
            <div className={classes.UserPost}>
                <h3>{props.title}</h3>
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
                <Button><StarBorderIcon/> Favorite</Button>
            </div>
        </div>            
    )
}

export default post;
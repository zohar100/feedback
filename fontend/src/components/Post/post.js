import React from 'react';

import userImg from '../../assets/images/user-def.png';
import MoreOptions from '../UI/MoreOptions/MoreOptions';
import classes from './post.module.css';

const post = (props) => {
    return(
        <div className={classes.Post}>
        <div className={classes.UserInfo}>
            <img src={userImg} alt='image1'/>
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

        </div>
        </div>            
    )
}

export default post;
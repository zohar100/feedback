import React from 'react';
import PropTypes from 'prop-types';

import classes from './Comment.module.css';
import OptionsModal from '../../UI/OptionsModal/OptionsModal';
import ProfileImage from '../../ProfileImage/ProfileImage';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const comment = (props) => {
    const commentOptionList = [
        {
            text: 'Delete',
            show: props.showDeleteButton,
            click: props.deleteComment,
            svgComponent: DeleteOutlineIcon
        },
        {
            text: 'Report',
            svgComponent: ErrorOutlineIcon
        }
    ]
    return(
        <div className={classes.Comment}>
            <div className={classes.CommentImage}>
                <ProfileImage imageUrl={props.imageUrl}/>
            </div>
            <div className={classes.CommentBody}>
                <div className={classes.CommentName}>
                <h3>{props.username}</h3>
                    <MoreVertIcon onClick={props.modalClicked}/>
                    <OptionsModal
                    show={props.showModal}
                    optionList={commentOptionList}
                    clicked={props.modalClosed}/>
                </div>
                <p>{props.body}</p>
            </div>
        </div>
    )
}

comment.propTypes = {
    username: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired,
    modalClicked: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired
}

export default comment;
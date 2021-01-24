import React from 'react';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Input from '../../UI/Input/Input';
import classes from './CommentForm.module.css';
import useForm from '../../../utilities/useForm';
import * as actions from '../../../store/actions/index';

const CommentForm = props => {
    const addCommentHandler = () => {
        const comment = {
            body: formValue.body
        }
        props.onAddComment(comment, props.postId, props.token)
    }
 
     const [formValue, setInputValue, handleSubmit] = useForm(null, null, addCommentHandler);

    return (
        <form className={classes.CommentsInput} onSubmit={handleSubmit}>
            <AccountCircleIcon/>
            <Input
                elementType={'input'} 
                elementConfig={{type: 'text', placeholder: 'Write comment...', name: 'body'}}
                value={formValue.body || ""}
                changed={setInputValue}/>
        </form>
    )
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: (comment, postId, token) => dispatch(actions.addComment(comment, postId, token)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
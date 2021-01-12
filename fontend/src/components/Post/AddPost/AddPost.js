import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './AddPost.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import * as actions from '../../../store/actions/index';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';


const AddPost = props => {
    const [postInputs, setPostInputs] = useState({
        body: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Whats you think?'
            },
            value: ''
        },
        image: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Add image'
            },
            value: ''
        }
    })
    

    const inputChangedHandler = (event, controlName) => {
        event.preventDefault();
        const updatedControls = {
            ...postInputs,
            [controlName]: {
                ...postInputs[controlName],
                value: event.target.value,
            }
        }
        setPostInputs(updatedControls)
    }   

    const addPostHandler = (event) => {
        event.preventDefault();
       const post = {
            author: props.user.id,
            body: postInputs.body.value,
            image: postInputs.image.value
        }
        props.onAddPost(post, props.token)
        setPostInputs({
            body: { value: '' },
            image: { value: '' }
        })
    }
    

        let FormElementArray = [];
        for(let key in postInputs) {
            FormElementArray.push({
                id: key,
                config: postInputs[key]
            });
        }

        let form = FormElementArray.map(formElement => {
            return (
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
            )
        })

        return(
            <div className={classes.AddPost}>
                <div>
                    <AccountCircleIcon/>
                    <p>{props.user.username}</p>
                </div>
                <form>
                    <div className={classes.Inputs}>
                        {form}
                    </div>
                    <Button clicked={(event) => addPostHandler(event)}><PostAddIcon/> Post</Button>
                </form>
            </div>
        )
}

const mapStateToProps = state => {
    return{
        user: state.auth.user,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (token) => dispatch(actions.fetchPosts(token)),
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
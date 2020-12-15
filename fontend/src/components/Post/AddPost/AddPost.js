import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './AddPost.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import * as actions from '../../../store/actions/index';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';


class AddPost extends Component {
    state = {
        postInputs: {
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
        }
    }

    inputChangedHandler = (event, controlName) => {
        event.preventDefault();
        const updatedControls = {
            ...this.state.postInputs,
            [controlName]: {
                ...this.state.postInputs[controlName],
                value: event.target.value,
            }
        }
        this.setState({postInputs: updatedControls})
    }   

    addPostHandler = (event) => {
        event.preventDefault();
       const post = {
            author: this.props.user.id,
            body: this.state.postInputs.body.value,
            image: this.state.postInputs.image.value
        }
        this.props.onAddPost(post, this.props.token)
        this.setState({postInputs: {
            body: { value: '' },
            image: { value: '' }
        }})
    }
    
    render(){
        let FormElementArray = [];
        for(let key in this.state.postInputs) {
            FormElementArray.push({
                id: key,
                config: this.state.postInputs[key]
            });
        }

        let form = FormElementArray.map(formElement => {
            return (
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            )
        })

        return(
            <div className={classes.AddPost}>
                <div>
                    <AccountCircleIcon/>
                    <p>{this.props.user.username}</p>
                </div>
                <form>
                    <div className={classes.Inputs}>
                        {form}
                    </div>
                    <Button clicked={(event) => this.addPostHandler(event)}><PostAddIcon/> Post</Button>
                </form>
            </div>
        )
    }
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import classes from './Profile.module.css';
import profilBackground from '../../assets/images/profileBackground.jpg'
import Button from '../../components/UI/Button/Button';
import Post from '../../components/Post/Post';
import Input from '../../components/UI/Input/Input'
import AddPost from '../../components/Post/AddPost/AddPost';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class Profile extends Component {
    state = {
        showModal: {
            id: null,
        },
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

    deletePostHandler = (postId) => {
        this.props.onDeletePost(postId, this.props.token);
    }

    addPostHandler = (event) => {
        event.preventDefault();
       const post = {
            author: this.props.user.id,
            body: this.state.postInputs.body.value
        }
        this.props.onAddPost(post, this.props.token)
    }

    showModalHandler = ( postId) => {
        this.setState(prevState => {
            if(prevState.showModal.id === postId) {
                return{
                    showModal : {id:null}
                }
            }
            return {
                showModal: {id: postId}
            }
        })
    }

    render () {
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

        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!this.props.loading) {
            posts = (
            this.props.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter(post => post.author._id === this.props.user.id)
            .map(post => (
                <Post 
                key={post._id} 
                username={post.author.username} 
                body={post.body}
                createdAt = {post.createdAt}
                showModal={this.state.showModal.id === post._id ? true : false}
                clicked={() => this.showModalHandler(post._id)}
                deletePost={() => this.deletePostHandler(post._id)}
                showDeleteButton={post.author._id === this.props.user.id}
                />))
            );
        }

        return(
            <div className={classes.Profile}>
                <div className={classes.ProfileImage} style={{backgroundImage: `url(${profilBackground})`}}>
                    <div >
                        <AccountCircleIcon/>
                    </div>
                    <h2>
                        {this.props.user.username}
                    </h2>
                </div>
                <div className={classes.ProfileControl}>
                    <Button>Edit Profile</Button>
                    <Button>Add friend</Button>
                    <Button>Message</Button>
                </div>
                <div className={classes.ProfileInfo}>
                    <div className={classes.UserInfo}>
                        <h3>Info</h3>
                        <ul>
                            <li><span>Studies at:</span> schoolName</li>
                            <li><span>live in:</span> userCity</li>
                            <li><span>work at:</span> userWord </li>
                        </ul>
                    </div>
                    <div className={classes.UserFriends}>
                        <h3>Friends</h3>
                        <AccountCircleIcon/>
                        <AccountCircleIcon/>
                        <AccountCircleIcon/>
                        <AccountCircleIcon/>
                        <AccountCircleIcon/>
                        <AccountCircleIcon/>
                    </div>
                </div>
                <div className={classes.ProfilePosts}>
                    {/* <Friend
                        username={this.props.user.username}
                        city='NY'
                        study='Bear College'
                        work='Google'/> */}
                    <AddPost 
                        username={this.props.user.username}
                        addPost={(event) => this.addPostHandler(event)}> 
                        <div className={classes.Inputs}>
                            {form}
                        </div>
                    </AddPost>
                    {posts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state  => {
    return {
        user: state.auth.user,
        posts: state.post.posts,
        loading: state.post.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
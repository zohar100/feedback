import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.css';
import Post from '../../components/Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import AddPost from '../../components/Post/AddPost/AddPost';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';

class Posts extends Component {
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

    componentDidMount () {
        if(this.props.isAuthenticated){
            this.props.onFetchPosts(this.props.token);
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

        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!this.props.loading) {
            posts = (
            this.props.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
            <div className={classes.Posts}>
                <AddPost 
                username={this.props.user.username}
                addPost={(event) => this.addPostHandler(event)}> 
                    <div className={classes.Inputs}>
                        {form}
                    </div>
                </AddPost>
                    {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user,
        posts: state.post.posts,
        loading: state.post.loading,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (token) => dispatch(actions.fetchPosts(token)),
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
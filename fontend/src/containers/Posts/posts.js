import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './posts.module.css';
import Post from '../../components/Post/post';
import Spinner from '../../components/UI/Spinner/Spinner';
import AddPost from '../../components/Post/AddPost/AddPost';
import * as actions from '../../store/actions/index';

class Posts extends Component {
    state = {
        showModal: {
            id: null,
        },
    } 

    componentDidMount () {
        if(this.props.isAuthenticated){
            this.props.onFetchPosts();
        }
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
        console.log(postId);
    }

    deletePostHandler = (postId) => {
        this.props.onDeletePost(postId);
    }

    render(){
        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!this.props.loading) {
            posts = this.props.posts.map(post => (
            <Post 
            key={post._id} 
            username={post.author.username} 
            title={post.title} 
            body={post.body}
            showModal={this.state.showModal.id === post._id ? true : false}
            clicked={() => this.showModalHandler(post._id)}
            deletePost={() => this.deletePostHandler(post._id)}
            />));
        } 

        let authRedirect = null;
        if(!this.props.isAuthenticated){
            authRedirect = <Redirect to="/auth"/>
        }

        return(
            <div className={classes.Posts}>
                {authRedirect}
                <AddPost/>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        posts: state.post.posts,
        loading: state.post.loading,
        isAuthenticated: state.auth.localId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts()),
        onDeletePost: (postId) => dispatch(actions.deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
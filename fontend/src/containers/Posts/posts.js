import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.css';
import Post from '../../components/Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import AddPost from '../../components/Post/AddPost/AddPost';
import * as actions from '../../store/actions/index';
import Hoc from '../../hoc/Hoc/Hoc';

class Posts extends Component {
    state = {
        showModal: {
            id: null,
        },
        showComments: {
            id: null,
        },
    } 

    componentDidMount () {
        if(this.props.isAuthenticated){
            this.props.onFetchPosts(this.props.token);
        }
    }

    showModalHandler = (postId) => {
        this.setState(prevState => {
            if(prevState.showModal.id === postId) {
                return{
                    showModal : {id:null}
                }
            }
            return {
                showModal: {id: postId}
            }
        });
    }

    showCommentsHandler = (postId) => {
        this.setState(prevState => {
            if(prevState.showComments.id === postId) {
                return{
                    showComments : {id:null}
                }
            }
            return {
                showComments: {id: postId}
            }
        })
    }

    likeClickHandler = (postId) => {
        this.props.onLikePost(postId, this.props.user.id, this.props.token)
    }

    deletePostHandler = (postId) => {
        this.props.onDeletePost(postId, this.props.token);
    }

    addToFavoriteHandler = (postId) => {
        this.props.onAddToFavorite(postId, this.props.token)
    }

    render(){

        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!this.props.loading) {
            posts = (
            this.props.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(post => (
                <Hoc>
                <Post 
                key={post._id}
                userId={post.author._id}
                username={post.author.username} 
                body={post.body}
                image={post.image}
                createdAt = {post.createdAt}
                showModal={this.state.showModal.id === post._id ? true : false}
                modalClicked={() => this.showModalHandler(post._id)}
                deletePost={() => this.deletePostHandler(post._id)}
                showDeleteButton={post.author._id === this.props.user.id}
                commentClick={() => this.showCommentsHandler(post._id)}
                showComments={this.state.showComments.id === post._id ? true : false}
                commentModalClick={() => this.setState({showComments: { id: null }})}
                commentsCount={post.comments.length}
                likesCount={post.likes.length}
                likeClick={() => this.likeClickHandler(post._id)}
                likeActive={post.likes.find(like => like === this.props.user.id ? true : false)}
                addToFavorite={() => this.addToFavoriteHandler(post._id)}
                postId={post._id}
                post={post}
                />
                </Hoc>
))
            );
        } 

        return(
            <div className={classes.Posts}>
                <AddPost /> 
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
        onAddPost: (post, token) => dispatch(actions.addPost(post, token)),
        onLikePost: (postId, userId, token) => dispatch(actions.toggleLike(postId, userId, token)),
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
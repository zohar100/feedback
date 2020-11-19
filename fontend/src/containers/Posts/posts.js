import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './posts.module.css';
import Post from '../../components/Post/post';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Posts extends Component {

    componentDidMount () {
        this.props.onFetchPosts();
    }

    render(){
        let posts = <Spinner spinnerType="Primary-Spinner"/>;
        if(!this.props.loading) {
            posts = this.props.posts.map(post => (<Post key={post._id} username={post.username} title={post.title} body={post.body}/>))
        } 

        let authRedirect = null;
        if(!this.props.isAuthenticated){
            authRedirect = <Redirect to="/auth"/>
        }

        return(
            <div className={classes.Posts}>
                {authRedirect}
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
        onFetchPosts: () => dispatch(actions.fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
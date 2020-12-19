import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import classes from './Profile.module.css';
import profilBackground from '../../assets/images/profileBackground.jpg'
import Button from '../../components/UI/Button/Button';
import Post from '../../components/Post/Post';
import AddPost from '../../components/Post/AddPost/AddPost';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class Profile extends Component {
    state = {
        showModal: {
            id: null,
        },
        showComments: {
            id: null
        },
    } 

    componentDidMount () {
    //    console.log(this.props.match.params.id)
    this.props.onFetchUser(this.props.userId, this.props.token)
    }

    deletePostHandler = (postId) => {
        this.props.onDeletePost(postId, this.props.token);
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

    render () {
        let profile = (
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
                <AddPost />
                {this.props.posts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .filter(post => post.author._id === this.props.userId)
                    .map(post => (
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
                        postId={post._id}
                        post={post}
                    />))}
            </div>
        </div>
            );
            if(this.props.loading){
                profile = <Spinner spinnerType="Primary-Spinner"/>
            }

        return profile;
    }
}

const mapStateToProps = state  => {
    return {
        userId: state.auth.user.id,
        posts: state.post.posts,
        loading: state.user.loading,
        token: state.auth.token,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token)),
        onFetchUser: (userId, token) => dispatch(actions.fetchUser(userId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
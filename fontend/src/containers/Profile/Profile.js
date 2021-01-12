import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
 
import classes from './Profile.module.css';
import profilBackground from '../../assets/images/profileBackground.jpg'
import Button from '../../components/UI/Button/Button';
import Post from '../../components/Post/Post';
import AddPost from '../../components/Post/AddPost/AddPost';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const Profile = props => {
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null); 

    useEffect(() => {
        loadData();
    })

    const loadData = () => {
        if(props.match.params.id){
            if(!props.user.id || (props.user.id !== props.match.params.id)){
                props.onFetchUser(props.match.params.id, props.token)
            }
        }
    }

    const deletePostHandler = (postId) => {
        props.onDeletePost(postId, props.token);
    }

    const showModalHandler = ( postId) => {
        setShowModal(prevState => {
            if(prevState === postId) {
                return null;
            }
            return postId;
        });
    }

    const showCommentsHandler = (postId) => {
        setShowComments(prevState => {
            if(prevState === postId) {
                return null;

            }
            return postId;
        })
    }

    const followUserHandler = (userId) => {
        props.onFollowUser(userId, props.token);
    }

    const likeClickHandler = (postId) => {
        props.onLikePost(postId, props.user.id, props.token)
    }

    const addToFavoriteHandler = (postId) => {
        props.onAddToFavorite(postId, props.token)
    }


        let followOrUnfollow = props.user.followers.find(user => 
            user._id === props.currentUser.id
        );
        let profile = (
            <div className={classes.Profile}>
            <div className={classes.ProfileImage} style={{backgroundImage: `url(${profilBackground})`}}>
                <div >
                    <AccountCircleIcon/>
                </div>
                <h2>
                    {props.user.username}
                </h2>
            </div>
            <div className={classes.ProfileControl}>
                {props.user.id === props.currentUser.id ? 
                <Button btnType='Secondary'>Edit Profile</Button> : null}
                {props.user.id !== props.currentUser.id ? 
                <Button btnType='Secondary' clicked={() => followUserHandler(props.user.id)}>{followOrUnfollow ? 'Unfollow' : 'Follow'}</Button> : null}
                {props.user.id !== props.currentUser.id ? 
                <Button btnType='Secondary'>Message</Button>: null}
            </div>
            <div className={classes.ProfileInfo}>
                <div className={classes.UserFolowing}>
                    <h2>{props.user.following.length}</h2>
                    <h3>Following</h3>
                    </div>
                <div className={classes.UserFolowers}>
                    <h2>{props.user.followers.length}</h2>
                    <h3>Followers</h3>
                </div>
                <div className={classes.UserPosts}>
                    <h2>{props.user.posts.length}</h2>
                    <h3>Posts</h3>
                </div>
            </div>
            <div className={classes.ProfilePosts}>
                {/* <Friend
                    username={props.user.username}
                    city='NY'
                    study='Bear College'
                    work='Google'/> */}
                {props.user.id === props.currentUser.id ? <AddPost /> : null}
                {props.posts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .filter(post => post.author._id === props.user.id)
                    .map(post => (
                        <Post 
                        key={post._id} 
                        userId={post.author._id}
                        username={post.author.username} 
                        body={post.body}
                        image={post.image}
                        createdAt = {post.createdAt}
                        showModal={showModal === post._id ? true : false}
                        modalClicked={() => showModalHandler(post._id)}
                        deletePost={() => deletePostHandler(post._id)}
                        showDeleteButton={post.author._id === props.user.id}
                        commentClick={() => showCommentsHandler(post._id)}
                        showComments={showComments === post._id ? true : false}
                        commentModalClick={() => setShowComments(null)}
                        commentsCount={post.comments.length}
                        likesCount={post.likes.length}
                        likeClick={() => likeClickHandler(post._id)}
                        likeActive={post.likes.find(like => like === props.user.id ? true : false)}
                        addToFavorite={() => addToFavoriteHandler(post._id)}
                        favoriteActive={props.currentUser.favorites.find(favPost => favPost._id === post._id ? true : false)}
                        postId={post._id}
                        post={post}
                    />))}
            </div>
        </div>
            );
            if(props.loading){
                profile = <Spinner spinnerType="Primary-Spinner"/>
            }

        return profile;
}

const mapStateToProps = state  => {
    return {
        currentUser: state.auth.user,
        posts: state.post.posts,
        loading: state.auth.loading,
        token: state.auth.token,
        user: state.user.fetchedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeletePost: (postId, token) => dispatch(actions.deletePost(postId, token)),
        onAddPost: (post, token) => dispatch(actions.addPost(post, token)),
        onFetchUser: (userId, token) => dispatch(actions.fetchUser(userId, token)),
        onFollowUser: (userId, token) => dispatch(actions.followUser(userId, token)),
        onLikePost: (postId, userId, token) => dispatch(actions.toggleLike(postId, userId, token)),
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
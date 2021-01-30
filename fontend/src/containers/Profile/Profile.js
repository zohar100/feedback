import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
 
import classes from './Profile.module.css';
import useForm from '../../utilities/useForm';
import Posts from '../../components/Posts/Posts'
import profilBackground from '../../assets/images/profileBackground.jpg'
import Button from '../../components/UI/Button/Button';
import PostForm from '../../components/Posts/PostForm/PostForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import EditUser from './EditUser/EditUser';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import * as actions from '../../store/actions/index';


const Profile = props => {
    const addPostHandler = () => {
        const post = {
             author: props.user.id,
             body: postFormValue.body,
             image: postFormValue.image
         }
         props.onAddPost(post, props.token)
    }
    const [postFormValue, setPostInputValue, handlePostSubmit] = useForm(null, null, addPostHandler);

    const addCommentHandler = (postId) => {
        const comment = {
            body: commentFormValue.body
        }
        props.onAddComment(comment, postId, props.token)
    }
     const [commentFormValue, setCommentInputValue, handleCommentSubmit] = useForm(null, null, addCommentHandler);
    
    const [showModal, setShowModal] = useState(null);
    const [showComments, setShowComments] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(null);
    const [showEditUserModal, setShowEditUserModal] = useState(false);

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

    const showModalHandler = (postId) => {
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

    const likeClickHandler = (postId) => {
        props.onLikePost(postId, props.user.id, props.token)
    }

    const deletePostHandler = (postId) => {
        props.onDeletePost(postId, props.token);
    }

    const addToFavoriteHandler = (postId) => {
        props.onAddToFavorite(postId, props.token)
    }

    const showCommentModalHandler = (commentId) => {
        setShowCommentModal(prevState => {
            if(prevState === commentId) {
                return null;
            }
            return commentId
        });
    }

    const deleteCommentHandler = (commentId, postId) => {
        props.onDeleteComment(postId, commentId, props.token)
    }

    const followUserHandler = (userId) => {
        props.onFollowUser(userId, props.token);
    }

    const editUserButtonClicked = () => {
        console.log('clicked');
        setShowEditUserModal(true);
    }

        let followOrUnfollow = props.user.followers.find(user => 
            user._id === props.currentUser.id
        );
        let profile = (
            <div className={classes.Profile}>
            <div className={classes.ProfileImage} style={{backgroundImage: `url(${profilBackground})`}}>
                <div >
                    <ProfileImage 
                    imageUrl={props.user.profileImage.url}/>
                </div>
                <h2>
                    {props.user.username}
                </h2>
            </div>
            <div className={classes.ProfileControl}>
                {props.user.id === props.currentUser.id ? 
                <>
                <Button btnType='Secondary' clicked={() => editUserButtonClicked()}>Edit Profile</Button> 
                <EditUser 
                showModal={showEditUserModal}
                clickedModal={() => setShowEditUserModal(false)}/>
                </>
                : null}
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
                {props.user.id === props.currentUser.id ?                 
                <PostForm 
                    bodyValue={postFormValue.body || ""}
                    imageValue={postFormValue.image || ""}
                    inputValueChanged={setPostInputValue}
                    submitHandler={handlePostSubmit}
                    currentUser={props.user}/>  : null}
                <Posts
                    posts={props.posts.filter(post => post.author._id === props.user.id)}
                    loading={props.loading}
                    currentUser={props.currentUser}
                    showModal={showModal}
                    showModalHandler={showModalHandler}
                    deletePostHandler={deletePostHandler}
                    showCommentsHandler={showCommentsHandler}
                    likeClickHandler={likeClickHandler}
                    addToFavoriteHandler={addToFavoriteHandler}
                    showComments={showComments}
                    deleteCommentHandler={deleteCommentHandler}
                    showCommentModal={showCommentModal}
                    showCommentModalHandler={showCommentModalHandler}
                    bodyValue={commentFormValue.body || ""}
                    inputValueChanged={setCommentInputValue}
                    commentHandleSubmit={handleCommentSubmit}/>
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
        onAddToFavorite: (postId, token) => dispatch(actions.addToFavorite(postId, token)),
        onAddComment: (comment, postId, token) => dispatch(actions.addComment(comment, postId, token)),
        onDeleteComment: (postId, commentId, token) => dispatch(actions.deleteComment(postId, commentId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
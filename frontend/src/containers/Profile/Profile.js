import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
 
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


const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {user, loading, token} = useSelector(state => state.auth);
    const posts = useSelector(state => state.post.posts);
    const fetchedUser = useSelector(state => state.user.fetchedUser)

    const {deletePost, addPost, fetchUser, followUser, 
        toggleLike, addToFavorite, addComment, deleteComment} = actions;

    const addPostHandler = () => {
        const post = {
             author: fetchedUser.id,
             body: postFormValue.body,
             image: postFormValue.image
         }
         dispatch(addPost(post, token))
    }
    const [postFormValue, setPostInputValue, handlePostSubmit] = useForm(null, null, addPostHandler);

    const addCommentHandler = (postId) => {
        const comment = {
            body: commentFormValue.body
        }
        dispatch(addComment(comment, postId, token));
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
        if(params.id){
            if(fetchedUser.id == null || (fetchedUser.id !== params.id)){
                dispatch(fetchUser(params.id, token))
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
        dispatch(toggleLike(postId, fetchedUser.id, token));
    }

    const deletePostHandler = (postId) => {
        dispatch(deletePost(postId, token));
    }

    const addToFavoriteHandler = (postId) => {
        dispatch(addToFavorite(postId, token))
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
        dispatch(deleteComment(postId, commentId, token));
    }

    const followUserHandler = (userId) => {
        dispatch(followUser(userId, token));
    }

    const editUserButtonClicked = () => {
        setShowEditUserModal(true);
    }

        let followOrUnfollow = fetchedUser.followers.find(user => 
            user._id === user.id
        );
        let profile = (
            <div className={classes.Profile}>
            <div className={classes.ProfileImage} style={{backgroundImage: `url(${profilBackground})`}}>
                <div >
                    <ProfileImage 
                    imageUrl={fetchedUser.profileImage.url}/>
                </div>
                <h2>
                    {fetchedUser.username}
                </h2>
            </div>
            <div className={classes.ProfileControl}>
                {fetchedUser.id === user.id ? 
                <>
                <Button btnType='Secondary' clicked={() => editUserButtonClicked()}>Edit Profile</Button> 
                <EditUser 
                showModal={showEditUserModal}
                clickedModal={() => setShowEditUserModal(false)}/>
                </>
                : null}
                {fetchedUser.id !== user.id ? 
                <Button btnType='Secondary' clicked={() => followUserHandler(fetchedUser.id)}>
                    {followOrUnfollow ? 'Unfollow' : 'Follow'}
                </Button> : null}
                {fetchedUser.id !== user.id ? 
                <Button btnType='Secondary'>Message</Button>: null}
            </div>
            <div className={classes.ProfileInfo}>
                <div className={classes.UserFolowing}>
                    <h2>{fetchedUser.following.length}</h2>
                    <h3>Following</h3>
                    </div>
                <div className={classes.UserFolowers}>
                    <h2>{fetchedUser.followers.length}</h2>
                    <h3>Followers</h3>
                </div>
                <div className={classes.UserPosts}>
                    <h2>{fetchedUser.posts.length}</h2>
                    <h3>Posts</h3>
                </div>
            </div>
            <div className={classes.ProfilePosts}>
                {fetchedUser.id === user.id ?                 
                <PostForm 
                    bodyValue={postFormValue.body || ""}
                    imageValue={postFormValue.image || ""}
                    inputValueChanged={setPostInputValue}
                    submitHandler={handlePostSubmit}
                    currentUser={fetchedUser}/>  : null}
                <Posts
                    posts={posts.filter(post => post.author._id === fetchedUser.id)}
                    loading={loading}
                    currentUser={user}
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
            if(loading){
                profile = <Spinner spinnerType="Primary-Spinner"/>
            }

        return profile;
}

export default Profile;
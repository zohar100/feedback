import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
 
import classes from './Profile.module.css';
import useForm from '../../hooks/useForm';
import Posts from '../../components/Posts/Posts'
import profilBackground from '../../assets/images/profileBackground.jpg';
import PostForm from '../../components/Posts/PostForm/PostForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import ProfileImageSection from '../../components/Profile/ProfileImageSection/ProfileImageSection';
import ProfileControllers from '../../components/Profile/ProfileControllers/ProfileControllers';
import ProfileStats from '../../components/Profile/ProfileStats/ProfileStats';

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

        let followOrUnfollow = fetchedUser.followers.find(followUser => 
            followUser._id === user.id
        );
        let profile = (
            <div className={classes.Profile}>
            <ProfileImageSection
            profilBackground={profilBackground}
            profileImageUrl={fetchedUser.profileImage.url}
            username={fetchedUser.username}/>
            <ProfileControllers
            userId={fetchedUser.id}
            currentUserId={user.id}
            editUserButtonClicked={editUserButtonClicked}
            showEditUserModal={showEditUserModal}
            setShowEditUserModal={setShowEditUserModal}
            followUserHandler={followUserHandler}
            followOrUnfollow={followOrUnfollow}/>
            <ProfileStats
            userFolowing={fetchedUser.following.length}
            userFolowers={fetchedUser.followers.length}
            userPosts={fetchedUser.posts.length}/>
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
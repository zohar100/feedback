import React from 'react';
import { connect } from 'react-redux';

import classes from './Favorites.module.css';
import Favorite from '../../components/FavoritesList/Favorite/Favorite';
import * as actions from '../../store/actions/index';

const Favorites = props => {

    // useEffect(() => {
    //     props.onFetchFavorites(props.token, props.user.id)
    // })

        let posts = props.user.favorites.map(post => (
            <Favorite
            text={post.body}
            username={post.author.username}
            postId={post._id}
            postImageUrl={post.image}
            userImageUrl={post.author.profileImage.url}/>
        ))
        return(
            <div className={classes.Favorites}>
                <h2>FAVORITES</h2>
                {posts}
            </div>
        )
}

const mapStateToProps = state  => {
    return {
        user: state.auth.user,
        token: state.auth.token
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
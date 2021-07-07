import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './Favorites.module.css';
import Favorite from '../../components/FavoritesList/Favorite/Favorite';
import * as actions from '../../store/actions/index';

const Favorites = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth)

    const {addToFavorite} = actions

    const toggleFavorite = (token, postId, userId) => {
        dispatch(addToFavorite(token, postId, userId))
    }

    const navigateToPost = (postId) => {
        history.push('/favorites/' + user.id)
    }

        let posts = user.favorites.map(post => (
            <Favorite
            text={post.body}
            username={post.author.username}
            postImageUrl={post.image}
            userImageUrl={post.author.profileImage.url}
            toggleFavorite={() => toggleFavorite(token, post._id, user.id)}
            clickedToNavigate={() => navigateToPost(post._id)}/>
        ))
        if(user.favorites.length === 0)
            posts = <div className={classes.NoFavorites}>
                        <span >No favorites added!</span>
                    </div>

        return(
            <div className={classes.Favorites}>
                <h2>FAVORITES</h2>
                {posts}
            </div>
        )
}

export default Favorites;
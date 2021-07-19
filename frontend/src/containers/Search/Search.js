import React, {useEffect, useRef } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { useHistory } from 'react-router-dom';

import classes from './Search.module.css';
import Input from '../../components/UI/Input/Input';
import Friends from '../../components/Friends/Friends';
import useForm from '../../hooks/useForm';
import * as actions from '../../store/actions';

const Search = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {token, user} = useSelector(state => state.auth)
    const users = useSelector(state => state.user.users)

    const { searchUsers, followUser } = actions;

    const [searchFormValue, setSearchInputValue] = useForm(null, null, null);
    const searchRef = useRef();


    useEffect(() => {
            const timer = setTimeout(() => {
               dispatch(searchUsers(token, searchFormValue.text ));
                return () => {
                    clearTimeout(timer);
                } 
            }, 1000)
    },[searchFormValue, token, searchUsers, dispatch])

    const chatClicked = (id) => {
        history.push('/chats/' + id)
    }

    const followClicked = (userId) => {
        dispatch(followUser(userId, token))
    }
    
    const userClicked = (id) => {
        history.push('/profile/' + id)
    }

        return (
            <div className={classes.Friends}>
                <Input
                elementType='input'
                elementConfig={{
                    type: 'text', 
                    placeholder: 'Search...', 
                    name: 'text', 
                    ref: searchRef
                }}
                value={searchFormValue.text || ''}
                changed={setSearchInputValue}/>
                <div className={classes.FriendsList}>
                    <Friends
                    friends={users}
                    currentUserId={user.id}
                    chatClicked={chatClicked}
                    followClicked={followClicked}
                    userClicked={userClicked}
                    />
                </div>
            </div>
        )
}
export default Search;
import React, {useEffect, useRef } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import classes from './Search.module.css';
import Input from '../../components/UI/Input/Input';
import Friends from '../../components/Friends/Friends';
import useForm from '../../utilities/useForm';
import * as actions from '../../store/actions';

const Search = props => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const users = useSelector(state => state.user.users)

    const { searchUsers } = actions;

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
                    />
                </div>
            </div>
        )
}
export default Search;
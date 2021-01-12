import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios';

import classes from './Friends.module.css';
import Input from '../../components/UI/Input/Input';
import Friend from '../../components/Friend/Friend';

const Friends = props => {
    const [searchInput, setSearchInput] = useState({
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'search by name....'
            },
            value: ''
        })
    const [users, setUsers] = useState([]); 


    useEffect(() => {
        axios.get('/allusers', {headers: { "x-auth-token": props.token }})
        .then(response => {
            setUsers(response.data)
        })
        .catch(err => console.log(err));
    },[props.token])

    const inputChangedHandler = (event) => {
        event.preventDefault();
        const updatedControl = {
            ...searchInput,
            value: event.target.value
        }
        setSearchInput(updatedControl);
    } 

        return (
            <div className={classes.Friends}>
                <Input
                elementType={searchInput.elementType}
                elementConfig={searchInput.elementConfig}
                value={searchInput.value}
                changed={(event) => inputChangedHandler(event)}/>
                <div className={classes.FriendsList}>
                    {users.filter(user => {
                        if(searchInput.value === '') {
                            return user;
                        }else if(user.username.toLowerCase().includes(searchInput.value.toLowerCase())) {
                            return user;
                        }return null;
                    })
                    .map(user => (
                        <Friend 
                        key={user._id}
                        username={user.username}
                        city='NY'
                        study='EdiSchool'
                        work='Google'
                        userId={user._id}/>
                    ))}
                </div>
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Friends);
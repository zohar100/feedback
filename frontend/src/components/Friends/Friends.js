import React from 'react';

import Friend from './Friend/Friend';

const Friends = ({friends}) => (
    friends ? 
        friends.map(friend => (
            <Friend
                key={friend._id}
                username={friend.username}
                city='NY'
                study='EdiSchool'
                work='Google'
                userId={friend._id}
            />
    ))
    : <div></div>
);

export default Friends;
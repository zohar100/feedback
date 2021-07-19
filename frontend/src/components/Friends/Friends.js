import React from 'react';

import Friend from './Friend/Friend';

const Friends = ({friends, currentUserId, chatClicked, 
                followClicked, userClicked}) => (
    friends ? 
        friends.map(friend => (
            <Friend
                key={friend._id}
                username={friend.username}
                userId={friend._id}
                followersLength={friend.followers.length}
                messageButton={friend.followers.find(user => user === currentUserId)}
                chatClicked={() => chatClicked(friend._id)}
                followClicked={() => followClicked(friend._id)}
                userClicked={() => userClicked(friend._id)}
            />
    ))
    : null
);

export default Friends;
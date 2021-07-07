import React from 'react';

import Button from '../../UI/Button/Button';
import EditUser from '../../../containers/Profile/EditUser/EditUser';
import classes from './ProfileControllers.module.css';

const ProfileControllers = ({userId, currentUserId, editUserButtonClicked, 
                    showEditUserModal,setShowEditUserModal, followUserHandler,
                    followOrUnfollow }) => (
    <div className={classes.ProfileControllers}>
    {currentUserId === userId ? 
        <>
        <Button btnType='Secondary' 
        clicked={() => editUserButtonClicked()}>
            Edit Profile
        </Button> 
        <EditUser 
        showModal={showEditUserModal}
        clickedModal={() => setShowEditUserModal(false)}/>
        </>
        : null}
        {currentUserId !== userId ? 
        <Button btnType='Secondary' clicked={() => followUserHandler(userId)}>
            {followOrUnfollow ? 'Unfollow' : 'Follow'}
        </Button> : null}
        {currentUserId !== userId ? 
        <Button btnType='Secondary'>Message</Button>: null}
    </div>
)

export default ProfileControllers;
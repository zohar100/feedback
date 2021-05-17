import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import classes from './EditUser.module.css';
import useForm from '../../../utilities/useForm';
import checkValidity from '../../../utilities/checkFormValidity';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import * as actions from '../../../store/actions/index';

const formRules = {
    username: {
        required: true
    },
    image: {
        required: true
    },
    email: {
        required: true,
        isEmail: true,
    },
    password: {
        required: true,
        minLength: 6,
    },
    newPassword: {
        minLength: 6,
    }
} 

const EditUser = (props) => {
    const dispatch = useDispatch();
    const {token, user} = useSelector(state => state.auth)

    const { editUser } = actions;

    const submitHandler = () => {
        axios.post("https://httpbin.org/anything", formData)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        dispatch(editUser(user.id, formData, token));
    }

    const [formValue, valid, touched, setInputValue, handleSubmit, formData] = useForm(checkValidity, formRules, submitHandler);
    

    return (
        <Modal 
        show={props.showModal} 
        modalClosed={props.clickedModal}>
            <div className={classes.ProfileImage}>
                <ProfileImage imageUrl={user.profileImage.url}/>
                <h3>{user.username}</h3>
            </div>
            <from className={classes.Form}>
                <Input
                label="Username"
                icon="Username"
                elementType="input" 
                elementConfig={{type: 'text', placeholder: 'Username', name: 'username'}}
                value={formValue.username || user.username}
                invalid={!valid.username || false}
                shouldValidate={formRules.username}
                touched={touched.username || false}
                changed={setInputValue}/>
                <Input
                label="Email"
                icon="Email"
                elementType="input" 
                elementConfig={{type: 'text', placeholder: 'Email', name: 'email'}}
                value={formValue.email || user.email}
                invalid={!valid.email || false}
                shouldValidate={formRules.email}
                touched={touched.email || false}
                changed={setInputValue}/>
                <Input
                label="Image"
                elementType="input" 
                elementConfig={{type: 'file', placeholder: 'Profile image', name: 'file'}}
                value={formValue.image || ""}
                invalid={!valid.image || false}
                shouldValidate={formRules.image}
                touched={touched.image || false}
                changed={setInputValue}/> 
                <Input
                label=" Old password"
                icon="Password"
                elementType="input" 
                elementConfig={{type: 'password', placeholder: 'password', name: 'password'}}
                value={formValue.password || ""}
                invalid={!valid.password || false}
                shouldValidate={formRules.password}
                touched={touched.password || false}
                changed={setInputValue}/>
                <Input
                label="New password"
                icon="Password"
                elementType="input" 
                elementConfig={{type: 'password', placeholder: 'new password', name: 'newPassword'}}
                value={formValue.newPassword || ""}
                invalid={!valid.newPassword || false}
                shouldValidate={formRules.newPassword}
                touched={touched.newPassword || false}
                changed={setInputValue}/>
                <Button btnType='Secondary' clicked={handleSubmit}>Save</Button>
            </from>
        </Modal>
    )
}

export default EditUser;
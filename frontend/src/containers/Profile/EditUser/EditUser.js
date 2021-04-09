import React from 'react';
import { connect } from 'react-redux';

import classes from './EditUser.module.css';
import useForm from '../../../utilities/useForm';
import checkValidity from '../../../utilities/checkFormValidity';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import * as actions from '../../../store/actions/index';

const EditUser = (props) => {
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

    const submitHandler = () => {
        console.log(formData);
        props.onEditUser(props.user.id, formData, props.token);
    }

    const [formValue, valid, touched, setInputValue, handleSubmit, formData] = useForm(checkValidity, formRules, submitHandler);
    

    return (
        <Modal 
        show={props.showModal} 
        modalClosed={props.clickedModal}>
            <div className={classes.ProfileImage}>
                <ProfileImage imageUrl={props.user.profileImage.url}/>
                <h3>{props.user.username}</h3>
            </div>
            <from className={classes.Form}>
                <Input
                label="Username"
                icon="Username"
                elementType="input" 
                elementConfig={{type: 'text', placeholder: 'Username', name: 'username'}}
                value={formValue.username || props.user.username}
                invalid={!valid.username || false}
                shouldValidate={formRules.username}
                touched={touched.username || false}
                changed={setInputValue}/>
                <Input
                label="Email"
                icon="Email"
                elementType="input" 
                elementConfig={{type: 'text', placeholder: 'Email', name: 'email'}}
                value={formValue.email || props.user.email}
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

const mapStateToProps = state  => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditUser: (userId, user, token) => dispatch(actions.editUser(userId, user, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
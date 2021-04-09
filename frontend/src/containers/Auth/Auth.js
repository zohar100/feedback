import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import Hoc from '../../hoc/Hoc/Hoc';
import * as actions from '../../store/actions/index';
import checkValidity from '../../utilities/checkFormValidity';
import useForm from '../../utilities/useForm';

const Auth = props => {
    const formRules = {
        username: {
            required: true
        },
        email: {
            required: true,
            isEmail: true,
        },
        password: {
            required: true,
            minLength: 6,
        }
    } 

    const submitHandler = () => {
        // axios.post("https://httpbin.org/anything", formData)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err))
        if(isSingup) {
                props.onAuthRegister(formData)
        }else{
            props.onAuthLogin(
                formValue.email,
                formValue.password
            )
        }
    }

    const [formValue, valid, touched, setInputValue, handleSubmit, formData] = useForm(checkValidity, formRules, submitHandler);
    const [isSingup, setIsSignup] = useState(false);

    const switchAuthModeHandler = () => {
        setIsSignup(!isSingup);
    }
        let form = (
            <Hoc>
            {  isSingup ? <> 
            <Input
                label="username"
                icon="Username"
                elementConfig={{type: 'text', placeholder: 'Username', name: 'username'}}
                value={formValue.username || ""}
                invalid={!valid.username || false}
                shouldValidate={formRules.username}
                touched={touched.username || false}
                changed={setInputValue}/> 
                <Input
                label="Image"
                elementType="input" 
                elementConfig={{type: 'file', placeholder: 'Profile image', name: 'file'}}
                value={formValue.file || ""}
                touched={touched.file || false}
                changed={setInputValue}/> 
                </>: null}
                <Input
                label="email"
                icon="Email"
                elementType="input" 
                elementConfig={{type: 'text', placeholder: 'Email', name: 'email'}}
                value={formValue.email || ""}
                invalid={!valid.email || false}
                shouldValidate={formRules.email}
                touched={touched.email || false}
                changed={setInputValue}/>
                <Input
                label="password"
                icon="Password"
                elementType="input" 
                elementConfig={{type: 'password', placeholder: 'password', name: 'password'}}
                value={formValue.password || ""}
                invalid={!valid.password || false}
                shouldValidate={formRules.password}
                touched={touched.password || false}
                changed={setInputValue}/>
            </Hoc>
        ) 

        let authRedirect = null;
        if(props.isAuthenticated) {
          authRedirect= <Redirect to='/'/>
        }

        let spinnerOrForm = (
            <Hoc>
                    <div className={classes.FormDiv}>
                        <form>
                            {form}
                        </form>
                        <div className={classes.SwitchAuth}>
                            <Button clicked={handleSubmit}>
                                {isSingup ? 'Signup' : 'Login'}
                            </Button>
                            <p >
                                {isSingup ? 'have an account?' : 'dont have an account?'} 
                                <span onClick={switchAuthModeHandler} className={classes.SwitchButton}>
                                    click here
                                </span>
                            </p>
                        </div>
                    </div>
            </Hoc>
        );
        let err = null;
        if(props.error){
            err = <div className={classes.Error}> {props.error} </div> 
        }
        if(props.loading){
            spinnerOrForm = (
            <div className={classes.SpinnerDiv}>
                <Spinner spinnerType="Secendary-Spinner"/>
            </div>
            )
        }
    
        return (
            <div className={classes.Background}>
                {authRedirect}
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <div className={classes.Auth}>
                        {err}
                        {spinnerOrForm}
                </div>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthRegister: (username, email, password) => dispatch(actions.authRegister(username, email, password)),
        onAuthLogin: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth);
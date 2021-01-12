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
    const [formValue, setFormValue] = useForm(checkValidity, formRules);
    const [registerForm, setRegisterForm] = useState({
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
        password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        });
    const [loginForm, setLoginForm] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
        password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        });
    const [isSingup, setIsSignup] = useState(false);

    const inputChangedHandler = (event, controlName) => {
        let currentControls = isSingup ? registerForm : loginForm;
        const updatedControls = {
            ...currentControls,
            [controlName]: {
                ...currentControls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, currentControls[controlName].validation),
                touched: true
            }
        }
        if(isSingup){
            setRegisterForm(updatedControls)
        }
        setLoginForm(updatedControls);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSingup);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(isSingup) {
            props.onAuthRegister(
                registerForm.username.value,
                registerForm.email.value,
                registerForm.password.value
                )
        }else{
            props.onAuthLogin(
                loginForm.email.value,
                loginForm.password.value
            )
        }
    }


        let FormElementArray = [];
        let currentControls = isSingup ? registerForm : loginForm;
        for(let key in currentControls) {
            FormElementArray.push({
                id: key,
                config: currentControls[key]
            });
        }

        let form = FormElementArray.map(formElement => {
            return (
            <Hoc>
                <Input
                key= {formElement.id}
                label={formElement.config.elementConfig.placeholder}
                icon={formElement.config.elementConfig.placeholder}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
            </Hoc>
        ) 
    })

        let authRedirect = null;
        if(props.isAuthenticated) {
          authRedirect= <Redirect to='/'/>
        }

        let spinnerOrForm = (
            <Hoc>
                    <div className={classes.FormDiv}>
                        <form >
                            {form}
                        </form>
                        <div className={classes.SwitchAuth}>
                            <Button clicked={onSubmitHandler}>
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
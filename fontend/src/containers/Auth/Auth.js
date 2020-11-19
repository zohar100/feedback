import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Hoc from '../../hoc/Hoc/Hoc';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        registerControls: {
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
        },
        loginControls: {
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
        },
        isSingup: true
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let currentControls = this.state.isSingup ? this.state.registerControls : this.state.loginControls;
        const updatedControls = {
            ...currentControls,
            [controlName]: {
                ...currentControls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, currentControls[controlName].validation),
                touched: true
            }
        }
        if(this.state.isSingup){
            this.setState({registerControls: updatedControls})
        }
        this.setState({loginControls: updatedControls});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSingup: !prevState.isSingup }
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let currentControls = this.state.isSingup ? this.state.registerControls : this.state.loginControls;
        this.props.onAuth(currentControls.username.value, currentControls.password.value, this.state.isSingup);
    }

    render() {
        const FormElementArray = [];
        let currentControls = this.state.isSingup ? this.state.registerControls : this.state.loginControls;
        for(let key in currentControls) {
            FormElementArray.push({
                id: key,
                config: currentControls[key]
            });
        }

        let form = FormElementArray.map(formElement => (
            <Input
                key= {formElement.id}
                label={formElement.config.elementConfig.placeholder}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))

        let authRedirect = null;
        if(this.props.isAuthenticated) {
          authRedirect= <Redirect to='/'/>
        }

        let spinnerOrForm = (
            <Hoc>
                    <div className={classes.FormDiv}>
                        <form onSubmit = {this.onSubmitHandler}>
                            {form}
                            <button>
                            {this.state.isSingup ? 'Signup' : 'Login'}
                            </button>
                        </form>
                        <p onClick={this.switchAuthModeHandler}>
                            {this.state.isSingup ? 'have an account?' : 'dont have an account?'}
                        </p>
                    </div>
            </Hoc>
        );
        if(this.props.loading){
            spinnerOrForm = (
            <div className={classes.SpinnerDiv}>
                <Spinner spinnerType="Secendary-Spinner"/>
            </div>
            )
        }
    

        return (
            <div className={classes.Background}>
                {authRedirect}
                <div className={classes.Auth}>
                        <Logo/>
                        {spinnerOrForm}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.localId !== null,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, isSignup) => dispatch(actions.auth(username, password, isSignup))
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth);
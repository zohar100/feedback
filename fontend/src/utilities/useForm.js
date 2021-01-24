import { useState } from 'react';

const useForm = (validate, rules, callback) => {
    const [state, setState] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = event => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value});
        if(validate !== null && rules !==null) { 
            setValid({ ...valid, [event.target.name]: validate(event.target.value, rules[event.target.name]) });
            setTouched({ ...touched, [event.target.name]: true });
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        callback();
        for(let key in state) {
            setState({...state, [key]: ''})
            if(validate !== null && rules !==null) { 
                setValid({...valid, [key]: false})
                setTouched({...touched, [key]: false})
            }
        }
    }
    if(validate !== null && rules !==null) { 
    return [state, valid, touched, handleChange, handleSubmit]
    }else{
        return [state, handleChange, handleSubmit]
    }
}

export default useForm;
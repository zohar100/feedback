import { useState } from 'react';

const useForm = (validate, rules) => {
    const [state, setState] = useState({});

    const handleChange = event => {
        event.persist();
        setState({ ...state, 
            [event.target.name]: {
                value: event.target.value,
                valid: validate(event.target.value, rules[event.target.name])
            } })
    }
    
    const handleSubmit = event => {
        event.preventDefault();

        console.log(state)
    }

    return [state, handleChange, handleSubmit]
}

export default useForm;
import { useState } from 'react';

const useForm = (validate, rules, callback) => {
    const [state, setState] = useState({});
    const [valid, setValid] = useState({});
    const [touched, setTouched] = useState({});
    const [image, setImage] = useState()
    let formData = new FormData();
    let reader = new FileReader(); 

    const handleChange = event => {
        event.persist();
        if(event.target.files) {
            const newfile = event.target.files[0]
            setState({ ...state, file: event.target.files[0]});
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(newfile)
        }else{
            setState({ ...state, [event.target.name]: event.target.value});
        }
        if(validate !== null && rules !==null) { 
            setValid({ ...valid, [event.target.name]: validate(event.target.value, rules[event.target.name]) });
            setTouched({ ...touched, [event.target.name]: true });
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        for(let key in state) {
            formData.append([key], state[key])
            setState({...state, [key]: ''})
            if(validate !== null && rules !==null) { 
                setValid({...valid, [key]: false})
                setTouched({...touched, [key]: false})
            }
        }
        callback();
    }
    if(validate !== null && rules !==null) { 
    return [state, valid, touched, handleChange, handleSubmit, formData, image]
    }else{
        return [state, handleChange, handleSubmit, formData]
    }
}

export default useForm;
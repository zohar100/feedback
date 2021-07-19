import React from 'react';
import {useEffect} from 'react';

import Error from '../../components/UI/Error/Error';
import Hoc from '../Hoc/Hoc';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        useEffect(() => {
            if(error){
                setTimeout(()=> clearError(), 3000)
            }
        }, [error])

        return (
            <Hoc>
                <Error 
                show={error ? true : false} 
                message={error ? error.response.data.msg: null}
                />
                <WrappedComponent {...props}/>
            </Hoc>
        )
    }
}

export default withErrorHandler;
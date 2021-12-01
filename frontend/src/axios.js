import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:8080/api/'
});

// instance.interceptors.response.use(
//     response => (response), 
//     error => (Promise.reject(error.response.data.err))
//   )

export default instance;
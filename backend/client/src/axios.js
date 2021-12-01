import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://127.0.0.1:8080/api/'
});

// instance.interceptors.response.use(
//     response => (response), 
//     error => (Promise.reject(error.response.data.err))
//   )

export default instance;
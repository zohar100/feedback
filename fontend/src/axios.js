import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true,
    
});

// instance.interceptors.response.use(
//     response => (response), 
//     error => (Promise.reject(error.response.data.err))
//   )

export default instance;
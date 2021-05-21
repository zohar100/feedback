import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/'
});

// instance.interceptors.response.use(
//     response => (response), 
//     error => (Promise.reject(error.response.data.err))
//   )

export default instance;
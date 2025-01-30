import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for adding the token
api.interceptors.request.use(
    // console.log("HelloWorld!");
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

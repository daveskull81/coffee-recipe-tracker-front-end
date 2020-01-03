import axios from 'axios';

const apiRequest = token => {

    if (token) {
        return axios.create({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
            headers: {
                Authorization: token
            }
        });
    } else {
        return axios.create({
            baseURL: process.env.REACT_APP_BACKEND_BASE_URL
        });
    };
};

export default apiRequest;
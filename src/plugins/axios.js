import axios from 'axios';
import store from '../store';

axios.defaults.baseURL = process.env.VUE_APP_API_LOCATION;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common.Authorization = 'Bearer: ' + store.getters['User/data']?.token;
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // store.dispatch('auth/logout');
        }

        return Promise.reject(error);
    },
);

export default axios;

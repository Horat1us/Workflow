import axios from 'axios';
import lodash from 'lodash';

window._ = lodash;

import './md/demo.js';
import './md/material.min.js';
import './md/material-dashboard';
import 'bootstrap-sass/assets/javascripts/bootstrap';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found!');
}

window.axios.interceptors.response.use(
    (response) => {
        if (!response.data.success) {
            throw new Error(response.data.message ? response.data.message : "Error while retrieving data from server.");
        }
        return response;
    },
    (error) => {
        if(!error.response || error.response.status >= 500) {
            if (window.notificationSystem) {
                window.notificationSystem.addNotification({
                    message: error.message,
                    level: 'error',
                });
            } else {
                console.error("Can not found mounted notificationSystem");
            }
        }

        return Promise.reject(error);
    }
);
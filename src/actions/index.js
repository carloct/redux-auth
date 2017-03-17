import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function(dispatch) {

        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });

                localStorage.setItem('token', response.data.token);

                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError("Bad login info"));
            });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER })

                localStorage.setItem('token', response.data.token);

                browserHistory.push('/feature');
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
            });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(res => {
            dispatch({ type: FETCH_MESSAGE, payload: res.data.message })
        });
    }
}

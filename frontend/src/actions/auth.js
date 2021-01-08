// authentication actions
import axios from 'axios'; //for making api requests
import Cookies from 'js-cookie';
import { load_user } from './profile';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from './types';


//check is Authenticated
export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};
//login action creator
export const login = (username, password) =>async dispatch =>{

    //reguest configurations
    const config = {

        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }

    };
    // converting user data into a Json object.
    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`,body, config);
        if (res.data.success) {
            dispatch({
                type:LOGIN_SUCCESS
            });
            // funtion to load the user details.
            dispatch(load_user());

        }else{
            dispatch({
                type:LOGIN_FAIL
            });
        }     
        
    } catch (err) {

        dispatch({
            type:LOGIN_FAIL
        });        
    }

}
// registration end-point functionality action. Next, write the reducer for this in reducers/auth.js
export const register = (username, password, re_password) => async dispatch => {
    //reguest configurations
    const config = {

        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }

    };
    const body = JSON.stringify({username, password, re_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`,body, config);
        if (res.data.error) {
            dispatch({
                type:REGISTER_FAIL
            });
        }else{
            dispatch({
                type:REGISTER_SUCCESS
            });
        }

    }catch(err){
        dispatch({
            type:REGISTER_FAIL
        });
    }

 };
// action creator for logging out a user
 export const logout = () =>async dispatch =>{

    //reguest configurations
    const config = {

        header:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }

    };
    const body = JSON.stringify({
        'withCredentials':true
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/logout`,body, config);
        if (res.data.success) {
            dispatch({
                type:LOGOUT_SUCCESS
            });
        }else{
            dispatch({
                type:LOGOUT_FAIL
            });
        }     
        
    } catch (err) {

        dispatch({
            type:LOGOUT_FAIL
        });        
    }
};


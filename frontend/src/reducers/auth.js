/* eslint-disable import/no-anonymous-default-export */
// authentication reducers
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL
} from '../actions/types';

// the initialState
const initialState = {
    // application level states
    isAuthenticated: null
};
// for each action we need to make a reducer to support it, this is an annonymous function.
export default function (state = initialState, action){
    // destructure the action, Next, we now work on our register page.
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case REGISTER_FAIL:
            return state
        default:
            return state
        

    };   

};

// Reducers to handle the dispatch states.


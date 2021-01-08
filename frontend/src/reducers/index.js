// index reducers
import {combineReducers} from 'redux'
import auth from './auth'
import profile from './profile'

export default combineReducers({
    // for any other reducers made goes here.
    auth,
    profile
})
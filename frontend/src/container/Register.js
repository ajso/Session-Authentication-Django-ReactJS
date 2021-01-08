import React,{useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {register} from '../actions/auth';
import './register.css';
import CSRFToken from '../components/CSRFToken';

const Register = ({register, isAuthenticated}) => {

    //our form fields.
    const[formData, setFormData] = useState({
        // object to fetch form data, empty by default.
        username:'',
        password:'',
        re_password:''
    });


    //check the state of the new account. 
    const[accountCreated, setAccountCreated] = useState(false);

    // destructure the form fields.
    const {username, password,re_password} = formData;

    // this updates our form fields.
    const onChange = e=>setFormData({
        //this is to update each field at a time.
        ...formData, [e.target.name]:e.target.value 
    });

    //when the user submits the form.
    const onSubmit = e=>{
        e.preventDefault();

        if(password === re_password){
            // do the register action.
            register(username,password,re_password);
            //change the state of the account.
            setAccountCreated(true);
        }
    };

    //if successfully creates account, redirect to the home page.
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }
    else if(accountCreated){
        return <Redirect to='/login' />
    };


    return (
        <div className="register">
            <div className="container">
                <form className="form" onSubmit={e=>onSubmit(e)}>
                <h3>Register Here</h3>
                <CSRFToken />
                    <div className="form-group">
                        <label className='form-label  mt-3'>Username:</label>
                        <input type="text" 
                        className="form-control" 
                        placeholder="Username"
                        name='username'
                        value={username}
                        onChange={e=>onChange(e)}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label className='form-label mt-3'>Password:</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Password"
                        name='password'
                        value={password}
                        minLength='6'
                        onChange={e=>onChange(e)}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label className='form-label mt-3'>Confirm Password</label>
                        <input type="password"
                        className="form-control" 
                        placeholder="Confirm Password"
                        name='re_password'
                        value={re_password}
                        minLength='6'
                        onChange={e=>onChange(e)}
                        required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" >Register</button>
                    
                </form>
                <p className="forgot-password text-right mt-3">
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
            </div>
        </div>
    );
};
const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated    
});
export default connect(mapStateToProps,{register})(Register);
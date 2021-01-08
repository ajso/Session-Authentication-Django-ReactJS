import React,{useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

const Login = ({login, isAuthenticated}) => {

    //our form fields.
    const[formData, setFormData] = useState({
        // object to fetch form data, empty by default.
        username:'',
        password:''
    });

    // destructure the form fields.
    const {username, password} = formData;
    // this updates our form fields.
    const onChange = e=>setFormData({
        //this is to update each field at a time.
        ...formData, [e.target.name]:e.target.value 
    });
    //when the user submits the form.
    const onSubmit = e=>{
        e.preventDefault();
        // do the login action.
        login(username,password);    
    };
    //if successfully logged in, redirect to the home page.
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    };

    return (
    <div className="login">
        <div className="container">
                <form className="form" onSubmit={e=>onSubmit(e)}>
                <CSRFToken/>
                    <h3>Log in</h3>
                    <div className="form-group">
                        <label className='form-label  mt-3'>Username:</label>
                        <input type="text" autoFocus 
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
                        <input type="password" autoFocus 
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
                        <div className="custom-control custom-checkbox mt-3">
                            <input type="checkbox"
                            className="custom-control-input" 
                            id="customCheck1" />
                            <label className="custom-control-label" 
                            htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <button 
                    type="submit" 
                    className="btn btn-primary mt-3">Sign in</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="!#">password?</a>
                    </p>
                    <p className="forgot-password text-right">
                        Have no account yet? <Link to='/register'>Register</Link>
                    </p>
                </form>
        </div>
    </div>
    );
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated    
});

export default connect(mapStateToProps,{login})(Login);
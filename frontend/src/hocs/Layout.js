import React, {Fragment, useEffect} from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

const Layout = ({children, checkAuthenticated, load_user}) => {

    useEffect(() => {
        //included here because we want to use it once.
        checkAuthenticated();
        load_user();
    }, []);
    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated, load_user})(Layout);
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Layout from './hocs/Layout';
import Home from './container/Home';
import Register from './container/Register';
import Login from './container/Login';
import Dashboard from './container/Dashboard';

import {Provider} from 'react-redux';
import store from './store';

// rsc
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/' component={Dashboard} />
                    
                </Layout>            
            </Router>
        </Provider>
    );
};

export default App;
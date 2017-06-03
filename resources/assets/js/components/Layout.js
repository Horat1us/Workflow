import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import NotificationSystem from 'react-notification-system';

import createHistory from 'history/createBrowserHistory';

import Loader from './Loader';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Exit from "./Exit";

const History = createHistory();
const Layout = class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router history={History}>
            <div>
                <Route exact path="/" component={Loader}/>
                <Route path="/login" component={Login}/>
                <Route path="/exit" component={Exit}/>
                <Route path="/dashboard" component={Dashboard}/>
                <NotificationSystem ref={(notificationSystem) => window.notificationSystem = notificationSystem}/>
            </div>
        </Router>;
    }
};

export default Layout; 
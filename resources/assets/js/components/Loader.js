import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import User from "../data/User";

const STATE_LOADING = 'loading';
const STATE_UNKNOWN = 'login';
const STATE_DASHBOARD = 'dashboard';

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: STATE_LOADING,
        }
    }

    componentDidMount() {
        axios.get('/api/state')
            .then(({data}) => this.authenticateUser(data));
    }


    authenticateUser({user}) {
        window.user = new User(user);
        this.setState({loggedIn: user ? STATE_DASHBOARD : STATE_UNKNOWN});
    }

    render() {
        switch(this.state.loggedIn) {
            case STATE_LOADING:
                return <div>Loading...</div>;
            case STATE_UNKNOWN:
                return <Redirect to="/login"/>;
            case STATE_DASHBOARD:
                return <Redirect to="/dashboard"/>;
            default:
                return <div>Unknown user state.</div>;
        }
    }
}

export default Loader; 
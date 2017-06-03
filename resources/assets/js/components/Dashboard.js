import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!window.user) {
            return <Redirect to="/"/>
        }

        return <div>
            You are authenticated, {window.user.name}! <Link to="/exit">Exit</Link>
        </div>
    }
}

export default Dashboard; 
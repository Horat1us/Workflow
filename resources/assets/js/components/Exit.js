import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

class Exit extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.post('/api/logout')
            .then(() => {
                // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
                this.context.router.history.push('/');
            })
            .catch();
    }

    render() {
        if(!window.user) {
            return <Redirect to="/"/>;
        }
        return <div>Exiting...</div>;
    }
}

Exit.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default Exit; 
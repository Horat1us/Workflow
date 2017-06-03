import React, {Component} from 'react';
import moment from 'moment';
import Alert from "./partials/Alert";
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorMessage: null,
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({errorMessage: null});

        const {email, password} = this.state;
        if (!(email && password)) {
            window.notificationSystem.addNotification({
                level: 'warning',
                message: "Please enter your email and password",
            });
            return;
        }

        axios.post('/api/login', {
            email, password
        })
            .then(({data}) => {
                if(!('user' in data)) {
                    throw new Error("Wrong server answer format");
                }
                window.user = data.user;
                this.context.router.history.push('/dashboard');
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.response
                        ? (error.response.data.email || error.response.data.password || error.message)
                        : error.message,
                });
            })
    }

    handleChange(field) {
        return ({target}) => {
            this.setState({[field]: target.value});
        };
    }

    render() {
        if(window.user === undefined) {
            return <Redirect to="/"/>;
        }

        return <div className="signup-page">

            <div className="wrapper">
                <div className="header header-filter"
                     style={{
                         backgroundImage: 'url(https://source.unsplash.com/random)',
                         backgroundSize: 'cover',
                         backgroundPosition: 'top center',
                     }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
                                <div className="card card-signup">
                                    <div className="header header-info text-center">
                                        <h4>Log In</h4>
                                        <h2>The Workfow</h2>
                                    </div>
                                    <form onSubmit={this.handleSubmit.bind(this)}>

                                        <Alert type="danger" isOpen={!!this.state.errorMessage}>
                                            {this.state.errorMessage}
                                        </Alert>

                                        <div className="form-group label-floating">
                                            <label className="control-label">Email</label>
                                            <input type="text" className="form-control"
                                                   value={this.state.email}
                                                   onChange={this.handleChange('email')}/>
                                            <span className="material-input"/>
                                        </div>
                                        <div className="form-group label-floating">
                                            <label className="control-label">Password</label>
                                            <input type="password" className="form-control"
                                                   value={this.state.password}
                                                   onChange={this.handleChange('password')}/>
                                            <span className="material-input"/>
                                        </div>


                                        <button type="submit" className="btn btn-primary pull-right">
                                            Login
                                        </button>
                                        <div className="clearfix"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer">
                        <div className="container">
                            <div className="copyright pull-right">
                                &copy; {moment().format('YYYY')}, made with <i className="fa fa-heart heart"/> using <a
                                href="http://github.com/horat1us/workflow" target="_blank">GitHub</a>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>
        </div>;
    }
}

Login.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

export default Login; 
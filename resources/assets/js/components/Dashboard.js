import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import User from "../data/User";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Main Page",
        };
    }

    getChildContext() {
        return {
            changeTitle: (title) => this.title = title,
        }
    }

    get menuItems() {
        return [
            {
                title: 'Dashboard',
                link: '/dashboard',
                strict: true,
            },
            {
                title: "Push",
                link: '/dashboard/push'
            }
        ]
            .map((link) => {
                link.isActive = link.strict
                    ? window.location.pathname === link.link
                    : window.location.pathname.includes(link.link);
                return link;
            })
            .filter(({permission}) => !permission || window.user.can(permission));
    }

    get title() {
        return this.state.title;
    }

    set title(title) {
        this.setState({title});
    }

    getIcon(link) {
        switch (link) {
            default:
                return 'dot-circle-o';
        }
    }

    render() {
        if (!window.user) {
            return <Redirect to="/"/>
        }

        return <div className="wrapper">
            <div className="sidebar" data-color="red" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo">
                    <a href="http://github.com/horat1us/workflow" className="simple-text">
                        The Workflow
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.menuItems.map(({title, isActive, link}) => {
                            return <li className={isActive ? 'active' : ''} key={link}>
                                <Link to={link}>
                                    <i className={`fa fa-${this.getIcon(link)}`}/>
                                    <p>{title}</p>
                                </Link>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className="sidebar-background" style={{backgroundImage: 'url(/img/sidebar-1.jpg)'}}/>
            </div>

            <div className="main-panel">
                <nav className="navbar navbar-transparent navbar-absolute">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/dashboard">{this.title}</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-home"/>
                                        <p className="hidden-lg hidden-md">Dashboard</p>
                                    </a>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-bell"/>
                                        <span className="notification">5</span>
                                        <p className="hidden-lg hidden-md">Notifications</p>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Mike John responded to your email</a></li>
                                        <li><a href="#">You have 5 new tasks</a></li>
                                        <li><a href="#">You're now friend with Andrew</a></li>
                                        <li><a href="#">Another Notification</a></li>
                                        <li><a href="#">Another One</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-user"/>
                                        <p className="hidden-lg hidden-md">Profile</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="content">

                </div>

                <footer className="footer">
                    <div className="container-fluid">

                        <p className="copyright pull-right">
                            2017 Some Copyright
                        </p>
                    </div>
                </footer>
            </div>
        </div>;
    }
}

Dashboard.childContextTypes = {
    changeTitle: PropTypes.func,
};

export default Dashboard;
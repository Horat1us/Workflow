import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ALERT_TYPE_DANGER = 'danger';
const ALERT_TYPE_WARNING = 'warning';
const ALERT_TYPE_INFO = 'info';
const ALERT_TYPE_SUCCESS = 'success';

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    get icon() {
        switch (this.props.type) {
            case ALERT_TYPE_INFO:
                return 'info-circle';
            case ALERT_TYPE_WARNING:
                return 'exclamation-triangle';
            case ALERT_TYPE_DANGER:
                return 'exclamation-circle';
            case ALERT_TYPE_SUCCESS:
                return 'check';
            default:
                return '';
        }
    }

    render() {
        if(!this.props.isOpen) {
            return null;
        }

        return <div className={`alert alert-${this.props.type}`}>
            <div className="container-fluid">
                <div className="alert-icon">
                    <i className={`fa fa-${this.icon}`}/>
                </div>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true" onClick={this.props.onClean}><i className="fa fa-clear"/></span>
                </button>
                {this.props.children}
            </div>
        </div>;
    }
}

Alert.defaultProps = {
    onClean: () => {
    },
};

Alert.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([
        ALERT_TYPE_DANGER,
        ALERT_TYPE_WARNING,
        ALERT_TYPE_SUCCESS,
        ALERT_TYPE_INFO,
    ]).isRequired,
};

export default Alert; 
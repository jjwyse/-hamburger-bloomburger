import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
import {push} from 'react-router-redux';

const IsUserAuthenticated = WrappedComponent => {
  class IsUserAuthenticatedClass extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      toLogin: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const {isAuthenticated, toLogin} = this.props;
      if (!isAuthenticated) {
        toLogin();
      }
    }

    render() {
      const {isAuthenticated} = this.props;
      return isAuthenticated ? <WrappedComponent {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: !isNil(state.authentication.user),
  });

  const mapDispatchToProps = dispatch => {
    return {
      toLogin: () => dispatch(push('/login')),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(IsUserAuthenticatedClass);
};

export default IsUserAuthenticated;

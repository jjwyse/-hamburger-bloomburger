import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isNil } from 'ramda';
import { routerActions } from 'react-router-redux';
import styled from 'styled-components';
import { oauthLogin } from 'state/authentication';
import properties from 'properties';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'material-ui/SvgIcon';

const GitHubIcon = (props) => (
  <SvgIcon {...props}>
    {<path
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />}
  </SvgIcon>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  text-align: right;
`;

const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
`;

class Login extends Component {
  componentWillMount() {
    const { authenticated, location, login, replace, redirect } = this.props;
    if (location.query && location.query.code) {
      login(location.query.state, location.query.code);
    } else if (authenticated) {
      replace(redirect);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { authenticated, replace, redirect } = nextProps;
    const { authenticated: wasAuthenticated } = this.props;
    if (!wasAuthenticated && authenticated) {
      replace(redirect);
    }
  }

  render() {
    const onLoginWithGithub = e => {
      e.preventDefault();
      window.location = `https://www.github.com/login/oauth/authorize?client_id=${properties.githubClientId}&allow_signup=true&scope=&redirect_uri=${properties.redirectUri}`;
    };

    return (
      <Container>
        <Video autoPlay muted loop className="fillWidth" >
          <source src="/assets/videos/a-working-man.mp4" type="video/mp4" />
        </Video>
        <LoginContainer>
          <h3><b>Bloomburger</b> | The blogs you care about, and nothing more. </h3>
          <RaisedButton
            href="https://github.com/callemall/material-ui"
            target="_blank"
            label="Login with Github"
            onClick={onLoginWithGithub}
            icon={<GitHubIcon />}
          />
        </LoginContainer>
      </Container>
    );
  }
}
Login.propTypes = {
  location: PropTypes.object,
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  replace: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    authenticated: !isNil(state.authentication.user),
    redirect: props.location.query.redirect || '/blogs',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (state, code) => dispatch(oauthLogin(state, code)),
    replace: redirect => dispatch(routerActions.replace(redirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navigation from 'components/Navigation';
import { connect } from 'react-redux';
import { logoutUser } from 'state/authentication';
import { push } from 'react-router-redux';

const TemplateContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoggedInTemplate = ({ children, home, logout }) => {
  return (
    <TemplateContainer>
      <Navigation onLogout={logout} onGoHome={home} />
      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
  home: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUser());
    dispatch(push('/login'));
  },
  home: () => dispatch(push('/blogs'))
});

export default connect(null, mapDispatchToProps)(LoggedInTemplate);

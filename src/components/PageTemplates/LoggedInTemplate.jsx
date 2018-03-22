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

const LoggedInTemplate = ({ children, logout }) => {
  return (
    <TemplateContainer>
      <Navigation onLogout={logout} />
      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUser());
    dispatch(push('/login'));
  }
});

export default connect(null, mapDispatchToProps)(LoggedInTemplate);

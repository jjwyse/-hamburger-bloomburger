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

const LoggedInTemplate = ({ children, createBlog, home, logout }) => {
  return (
    <TemplateContainer>
      <Navigation onLogout={logout} onGoHome={home} onCreateBlog={createBlog} />
      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
  createBlog: PropTypes.func.isRequired,
  home: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUser());
    dispatch(push('/login'));
  },
  home: () => dispatch(push('/blogs')),
  createBlog: () => dispatch(push('/blogs/new'))
});

export default connect(null, mapDispatchToProps)(LoggedInTemplate);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logoutUser } from 'state/authentication';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

const TemplateContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoggedInTemplate = ({ children, logout }) => {
  const MenuItems = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="Sign out" onClick={logout} />
    </IconMenu>
  );
  return (
    <TemplateContainer>
      <AppBar
        title="Bloomburger"
        iconElementRight={<MenuItems />}
      />

      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(null, mapDispatchToProps)(LoggedInTemplate);

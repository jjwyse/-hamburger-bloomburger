import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

const Navigation = ({ onLogout }) => {
  const MenuItems = () => (
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem primaryText="Sign out" onClick={onLogout} />
    </IconMenu>
  );
  return (
    <AppBar
      title="Bloomburger"
      iconElementRight={<MenuItems />}
    />
  );
}
Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired
};
export default Navigation;
import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
import styled from 'styled-components';

import Mask from 'components/Mask/Mask';

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = ({children, mask}) => {
  return (
    <App>
      <MuiThemeProvider>
        <Wrapper>
          {children}
          {!isNil(mask) && !isNil(mask.message) && <Mask key={mask.message} message={mask.message} />}
        </Wrapper>
      </MuiThemeProvider>
    </App>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
  mask: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    mask: state.notifications.mask,
  };
};

export default connect(mapStateToProps)(Layout);

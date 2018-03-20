import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TemplateContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const LoggedInTemplate = ({children}) => {
  return (
    <TemplateContainer>
      {children}
    </TemplateContainer>
  );
};
LoggedInTemplate.propTypes = {
  children: PropTypes.any,
};

export default LoggedInTemplate;

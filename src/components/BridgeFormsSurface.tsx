import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { prop } from 'bitcoinjs-lib/types/payments/lazy';
import { BoxExtendedProps } from 'grommet/components/Box';

const StyledBox = styled(Box)`
  background: ${props => props.theme.surface.color};
  border-radius: 25px;
  box-shadow: ${props => props.theme.surface.boxShadow};
  border: ${props => props.theme.surface.border};
`;

export const BridgeFormsSurface: React.FC<BoxExtendedProps> = ({ children, ...props }) => {
  return (
    <StyledBox
      direction="column"
      align="center"
      justify="center"
      fill="horizontal"
      pad="large"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

BridgeFormsSurface.displayName = 'BridgeFormsSurface';

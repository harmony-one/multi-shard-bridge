import * as React from 'react';
import { withTheme } from 'styled-components';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react-lite';
import { IStyledChildrenProps } from '../../interfaces';
import { SignInButton } from './components/SignInButton';
import { HeadBalance } from './components/HeadBalance';
import { ThemeButton } from '../ThemeButton';
import { BridgeLogo } from '../BridgeLogo';
import { Text } from '../Base';
import { config } from '../../config';

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme }: IStyledChildrenProps<BoxProps>) => {
    const { container } = theme;
    const { minWidth, maxWidth } = container;

    return (
      <Box
        direction="row"
        align="center"
        justify="around"
        style={{
          minWidth,
          maxWidth,
          margin: '0 auto',
          padding: '0px 30px',
          height: 100,
          minHeight: 100,
          width: '100%',
        }}
      >
        <BridgeLogo />
        <Box direction="row" gap="4px">
          <Box justify="center">
            <Text>{config.network}</Text>
          </Box>
          <ThemeButton />
          <HeadBalance />
          {/*{config.isTestnet && <FaucetButtons />}*/}
          <SignInButton />
        </Box>
      </Box>
    );
  }),
);

Head.displayName = 'Head';

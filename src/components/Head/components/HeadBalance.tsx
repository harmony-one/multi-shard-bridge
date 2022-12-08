import React from 'react';
import { Text } from '../../Base';
import { Box } from 'grommet';
import {
  formatWithEightDecimals,
  formatWithTwoDecimals,
  ones,
} from '../../../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { satoshiToBitcoin } from '../../../services/bitcoin';

export const HeadBalance: React.FC = observer(() => {
  const { userStore } = useStores();

  if (!userStore.isAuthorized) {
    return null;
  }

  return (
    <Box direction="column" justify="center" align="end">
      <Box direction="row">
        <Text size="small" bold>
          {formatWithTwoDecimals(ones(userStore.balance))}
        </Text>
        <Text size="small">&nbsp;&nbsp;ONE</Text>
      </Box>
    </Box>
  );
});

HeadBalance.displayName = 'HeadBalance';

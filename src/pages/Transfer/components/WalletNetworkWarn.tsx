import React from 'react';
import { observer } from 'mobx-react';
import { Box } from 'grommet/components/Box';
import { Text } from '../../../components/Base';
import { useStores } from '../../../stores';
import { SwitchNetworkButton } from './SwitchNetworkButton';

interface Props {}

export const WalletNetworkWarn: React.FC<Props> = observer(() => {
  const { userStore, transferPageStore } = useStores();

  const requiredNetwork = transferPageStore.getRequiredNetwork();
  const destinationNetwork = transferPageStore.getDestinationNetwork();
  let currentNetwork = userStore.getCurrentNetwork();

  if (currentNetwork === requiredNetwork) {
    return null;
  }

  return (
    <Box direction="column" fill gap="xsmall" align="center">
      <Text size="xsmall" align="center">
        You have authorised with MetaMask, but the selected network does not
        match&nbsp;
        <span style={{ color: 'rgb(0, 173, 232)' }}>
          {requiredNetwork.chainName}
        </span>
        . Please change network to {requiredNetwork.chainName} for
        transfer&nbsp;
        {requiredNetwork.chainName}&nbsp;-{'>'}&nbsp;
        {destinationNetwork.chainName} with MetaMask.
      </Text>
      <SwitchNetworkButton />
    </Box>
  );
});

WalletNetworkWarn.displayName = 'WalletNetworkWarn';

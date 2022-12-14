import React, { useCallback, useMemo } from 'react';
import { Button } from 'grommet';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import styled from 'styled-components';
import { TRANSFER_MODE } from '../TransferPageStore';
import { getNetworkConfig, NETWORK } from '../../../constants/network';

interface Props {}

const StyledButton = styled(Button)`
  text-align: center;
  background-color: ${props => props.theme.palette.Blue};
  border-radius: 15px;
  padding: 4px 20px;
  font-size: 14px;
  min-height: 40px;
  color: ${props => props.theme.palette.Basic100};
`;

export const SwitchNetworkButton: React.FC<Props> = observer(() => {
  const { transferPageStore, userStore } = useStores();

  const networkType = useMemo(() => {
    if (transferPageStore.transferMode === TRANSFER_MODE.SHARD0_TO_SHARD1) {
      return NETWORK.HARMONY_SHARD_1;
    }

    return NETWORK.HARMONY_SHARD_0;
  }, [transferPageStore.transferMode]);

  const switchNetwork = useCallback(() => {
    userStore.switchNetwork(networkType);
  }, [networkType]);

  const network = getNetworkConfig(networkType);

  return (
    <StyledButton onClick={switchNetwork}>
      Switch MetaMask to {network.chainName}
    </StyledButton>
  );
});

SwitchNetworkButton.displayName = 'SwitchNetworkButton';

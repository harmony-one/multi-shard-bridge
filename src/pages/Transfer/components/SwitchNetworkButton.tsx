import React, { useCallback, useMemo } from 'react';
import { Button } from 'grommet';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import styled from 'styled-components';
import { SHARDS, TRANSFER_MODE } from '../TransferPageStore';
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

  const switchNetwork = useCallback(() => {
    userStore.switchNetwork(transferPageStore.shardFrom);
  }, [transferPageStore.shardFrom]);

  const network = getNetworkConfig(transferPageStore.shardFrom);

  return (
    <StyledButton onClick={switchNetwork}>
      Switch MetaMask to {network.chainName}
    </StyledButton>
  );
});

SwitchNetworkButton.displayName = 'SwitchNetworkButton';

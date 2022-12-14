import React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { NetworkHarmony } from './NetworkHarmony';
import { NetworkDirection } from './NetworkDirection';
import { useStores } from '../../../stores';
import { TRANSFER_MODE } from '../TransferPageStore';

interface Props {}

export const NetworkRow: React.FC<Props> = observer(() => {

  const {transferPageStore} = useStores();

  const [fromShardName, toShardName] = transferPageStore.transferMode === TRANSFER_MODE.SHARD0_TO_SHARD1 ? ['Shard 0', 'Shard 1'] : ['Shard 1', 'Shard 0'];

  return (
    <Box direction="row" align="center" fill>
      <Box basis="33%" flex={{ grow: 1, shrink: 0 }}>
        <NetworkHarmony  title="From" shardName={fromShardName}/>
      </Box>
      <Box align="center" pad={{ vertical: '16px' }}>
        <NetworkDirection />
      </Box>
      <Box basis="33%" flex={{ grow: 1, shrink: 0 }}>
        <NetworkHarmony title="To" shardName={toShardName} />
      </Box>
    </Box>
  );
});

NetworkRow.displayName = 'NetworkRow';

import React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { NetworkHarmony } from './NetworkHarmony';
import { NetworkDirection } from './NetworkDirection';
import { useStores } from '../../../stores';
import { SHARDS, TRANSFER_MODE } from '../TransferPageStore';

interface Props {}

export const NetworkRow: React.FC<Props> = observer(() => {
  const { transferPageStore } = useStores();

  return (
    <Box direction="row" align="center" fill>
      <Box basis="33%" flex={{ grow: 1, shrink: 0 }}>
        <NetworkHarmony
          title="From"
          value={transferPageStore.shardFrom}
          onChange={value => {
            if (value === transferPageStore.shardTo) {
              transferPageStore.switchDirection();
            } else {
              transferPageStore.shardFrom = value;
            }
          }}
        />
      </Box>
      <Box align="center" pad={{ vertical: '16px' }}>
        <NetworkDirection />
      </Box>
      <Box basis="33%" flex={{ grow: 1, shrink: 0 }}>
        <NetworkHarmony
          title="To"
          value={transferPageStore.shardTo}
          onChange={value => {
            if (value === transferPageStore.shardFrom) {
              transferPageStore.switchDirection();
            } else {
              transferPageStore.shardTo = value;
            }
          }}
        />
      </Box>
    </Box>
  );
});

NetworkRow.displayName = 'NetworkRow';

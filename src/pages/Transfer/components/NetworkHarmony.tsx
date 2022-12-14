import React from 'react';
import { Text } from '../../../components/Base';
import { BridgeControl } from './BridgeControl';
import { NetworkIcon } from './NetworkIcon';

interface Props {
  title: string;
  shardName: string;
}

export const NetworkHarmony: React.FC<Props> = ({ title, shardName }) => {
  return (
    <BridgeControl
      title={title}
      centerContent={<NetworkIcon />}
      bottomContent={<Text size="small">{shardName}</Text>}
    />
  );
};

NetworkHarmony.displayName = 'NetworkHarmony';

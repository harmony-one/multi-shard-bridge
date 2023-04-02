import React from 'react';
import { Text } from '../../../components/Base';
import { SHARDS } from '../TransferPageStore';
import { BridgeControl } from './BridgeControl';
import { NetworkIcon } from './NetworkIcon';
import { NetworkMenu } from './NetworkMenuItem';

interface Props {
  title: string;
  value: string;
  onChange: (value: SHARDS) => void;
}

export const NetworkHarmony: React.FC<Props> = ({ title, value, onChange }) => {
  return (
    <BridgeControl
      title={title}
      centerContent={<NetworkIcon />}
      bottomContent={<NetworkMenu value={value} onChange={onChange} />}
    />
  );
};

NetworkHarmony.displayName = 'NetworkHarmony';

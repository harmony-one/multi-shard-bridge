import React, { useCallback } from 'react';
import { Button } from 'grommet/components/Button';
import { Text } from '../../../components/Base';
import { Transaction } from 'grommet-icons';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';

interface Props {}

export const NetworkDirection: React.FC<Props> = observer(() => {
  const { transferPageStore } = useStores();

  const handleChangeMode = useCallback(() => {
    transferPageStore.switchDirection();
  }, []);

  return (
    <Button
      onClick={handleChangeMode}
      style={{ width: '40px', textAlign: 'center' }}
    >
      <Text>
        <Transaction color="White" />
      </Text>
    </Button>
  );
});

NetworkDirection.displayName = 'NetworkDirection';

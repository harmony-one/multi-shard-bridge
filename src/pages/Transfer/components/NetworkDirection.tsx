import React, { useCallback, useContext } from 'react';
import { Button } from 'grommet/components/Button';
import { Text } from '../../../components/Base';
import { Transaction } from 'grommet-icons';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { ThemeContext } from '../../../themes/ThemeContext';

interface Props {}

export const NetworkDirection: React.FC<Props> = observer(() => {
  const { transferPageStore } = useStores();

  const themeContext = useContext(ThemeContext);
  const handleChangeMode = useCallback(() => {
    transferPageStore.switchDirection();
  }, []);

  return (
    <Button
      onClick={handleChangeMode}
      style={{ width: '40px', textAlign: 'center' }}
    >
      <Text>
        <Transaction color={themeContext.theme.palette.TextColor} />
      </Text>
    </Button>
  );
});

NetworkDirection.displayName = 'NetworkDirection';

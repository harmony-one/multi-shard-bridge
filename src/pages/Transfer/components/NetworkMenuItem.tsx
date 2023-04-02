import React, { useContext } from 'react';
import { Text, Icon } from '../../../components/Base';
import { Menu, Box } from 'grommet';
import { observer } from 'mobx-react';
import { ThemeContext } from '../../../themes/ThemeContext';
import { SHARDS } from 'pages/Transfer/TransferPageStore';

interface NetworkMenuItemProps {
  network: string;
  token: string;
  icon: React.ReactNode;
}

const NetworkMenuItem: React.FC<NetworkMenuItemProps> = ({
  network,
  token,
  icon,
}) => {
  return (
    <Box
      direction="row"
      justify="center"
      align="center"
      gap="8px"
      fill="horizontal"
    >
      <Box>{icon}</Box>
      <Box>
        <Text>{network}</Text>
      </Box>
      <Box alignSelf="end" margin={{ left: 'auto' }}>
        <Text size="xxsmall" color="NGray">
          {token}
        </Text>
      </Box>
    </Box>
  );
};

export const NetworkMenu = observer(({ value, onChange }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Menu
      style={{ padding: 0 }}
      alignSelf="center"
      dropProps={{
        align: { top: 'bottom' },
        background: themeContext.themeType === 'dark' ? '#000000' : '#f2f3f6',
        round: { size: '10px' },
        elevation: 'none',
        margin: { top: '12px' },
      }}
      justifyContent="center"
      label={`Shard ${value}`}
      items={[
        {
          label: 'Shard 0',
          onClick: () => onChange(SHARDS.SHARD0),
        },
        {
          label: 'Shard 1',
          onClick: () => onChange(SHARDS.SHARD1),
        },
        {
          label: 'Shard 2',
          onClick: () => onChange(SHARDS.SHARD2),
        },
        {
          label: 'Shard 3',
          onClick: () => onChange(SHARDS.SHARD3),
        },
      ]}
    >
      <Box gap="8px" direction="row">
        <Text size="small">{`Shard ${value}`}</Text>
        <Icon size="10" color="white" glyph="ArrowDownFilled" />
      </Box>
    </Menu>
  );
});

interface Props {
  title: string;
}

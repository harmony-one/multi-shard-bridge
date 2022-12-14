import React from 'react';
import { Text } from '../../Base';
import { Box } from 'grommet';
import { InputButton } from '../../Base/components/Inputs/InputButton';

interface Props {
  label: string;
  onClick: () => void;
}

export const InputLabelUseAddress: React.FC<Props> = ({ label, onClick }) => {
  return (
    <Box
      justify="between"
      align="center"
      direction="row"
      margin={{ bottom: 'xxsmall' }}
    >
      <Text bold size="large">
        {label}
      </Text>
      <Box direction="row">
        <InputButton onClick={onClick}>
          <Text size="small" color="Blue">
            use my address
          </Text>
        </InputButton>
      </Box>
    </Box>
  );
};

InputLabelUseAddress.displayName = 'InputLabelAvailableBalance';

import React from 'react';
import { Box } from 'grommet';
import { Text } from 'components/Base';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { Spinner } from '../../ui';
import { UITransactionStatus } from './UITransactionsStore';
import { LinkHarmony } from '../../components/LinkHarmony';
import { ModalHeader } from '../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../components/ActionModals';

interface UITxModalContentProps {
  txHash: string;
  status: UITransactionStatus;
  errorMessage: string;
  harmonyErrTxId?: string;
  onClose: () => Promise<void>;
}

export const UITxModalContent: React.FC<UITxModalContentProps> = ({
  txHash = '',
  status,
  errorMessage,
  harmonyErrTxId = '',
}) => {
  return (
    <Box align="center" gap="small">
      {status !== UITransactionStatus.FAIL && (
        <Box align="center">
          <Spinner />
        </Box>
      )}
      {txHash && (
        <Box direction="column">
          <Text align="center">Transaction:&nbsp;</Text>
          <LinkHarmony cut={false} hash={txHash} type="tx" />
        </Box>
      )}

      {errorMessage && (
        <Box align="center">
          <Text color="Red500">{errorMessage}</Text>
        </Box>
      )}
      {harmonyErrTxId && (
        <Box direction="row">
          <Text align="center">Transaction:</Text>
          <LinkHarmony hash={txHash} type="tx" />
        </Box>
      )}
    </Box>
  );
};

export const UITransactionModal: React.FC<TActionModalProps> = observer(
  props => {
    const { uiTxId } = props.actionData.data;
    const { onClose } = props.config.options;
    const { uiTransactionsStore } = useStores();
    const uiTx = uiTransactionsStore.map[uiTxId];

    if (!uiTx) {
      return null;
    }

    return (
      <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
        <ModalHeader title={uiTx.title} onClose={onClose} />
        <UITxModalContent
          txHash={uiTx.txHash}
          status={uiTx.status}
          onClose={onClose}
          errorMessage={uiTx.errorMessage}
          harmonyErrTxId={uiTx.harmonyErrTxId}
        />
      </Box>
    );
  },
);

UITransactionModal.displayName = 'UITransactionModal';

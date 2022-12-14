import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { useObserver } from 'mobx-react';
import {
  Form,
  isRequired,
  NumberInput,
  Input,
  MobxForm,
} from 'components/Form';
import {
  formatWithEightDecimals,
  lessThanWei,
  moreThanZero,
} from '../../../../utils';
import { IStores, useStores } from '../../../../stores';
import { InputMaxAmountControl } from 'components/Form/components/InputMaxAmountControl';
import { InputLabelAvailableBalance } from '../../../../components/Form/components/InputLabelAvailableBalance';
import utils from 'web3-utils';

type Props = Pick<IStores, 'transferPageStore'>;

export const TransferForm: React.FC<Props> = () => {
  const { transferPageStore, userStore } = useStores();
  const [form, setForm] = useState<MobxForm>();

  const handleMaxClick = useCallback(() => {
    transferPageStore.form.oneAmount = formatWithEightDecimals(
      utils.fromWei(userStore.balance),
    );
  }, [transferPageStore.form.oneAmount, userStore.balance]);

  const handleSubmit = useCallback(() => {
    form.validateFields().then(() => {
      transferPageStore.createTransfer();
    });
  }, [form, transferPageStore]);

  return useObserver(() => (
    <Form ref={ref => setForm(ref)} data={transferPageStore.form}>
      <Box gap="20px">
        <NumberInput
          name="oneAmount"
          type="decimal"
          precision="8"
          delimiter="."
          placeholder="0.0"
          inputLabel={
            <InputLabelAvailableBalance
              label="Amount"
              balance={formatWithEightDecimals(
                utils.fromWei(userStore.balance).toString(),
              )}
              tokenName="ONE"
            />
          }
          renderRight={
            <InputMaxAmountControl onClick={handleMaxClick} tokenName="ONE" />
          }
          style={{ width: '100%' }}
          rules={[
            isRequired,
            moreThanZero,
            lessThanWei(userStore.balance, 'transfer amount exceeds balance'),
          ]}
        />

        <Input
          label="Recipient"
          name="oneAddress"
          type="string"
          placeholder="Enter recipient address"
          style={{ width: '100%' }}
          rules={[isRequired]}
        />

        <Divider colorful fullwidth />
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={transferPageStore.status === 'pending'}
          isLoading={transferPageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  ));
};

export default TransferForm;

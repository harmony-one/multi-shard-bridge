import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button } from 'components/Base';
import { observer, useObserver } from 'mobx-react';
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
import { InputLabelUseAddress } from '../../../../components/Form/components/InputLabelUseAddress';

type Props = Pick<IStores, 'transferPageStore'>;

export const TransferForm: React.FC<Props> = observer(() => {
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

  const handleUseAddress = useCallback(() => {
    transferPageStore.form.oneAddress = userStore.address;
  }, [userStore.address]);

  const disabled =
    !transferPageStore.isNetworkValid() ||
    transferPageStore.status === 'pending';

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
          name="oneAddress"
          type="string"
          placeholder="Enter recipient address"
          style={{ width: '100%' }}
          rules={[isRequired]}
          inputLabel={
            <InputLabelUseAddress onClick={handleUseAddress} label="Address" />
          }
        />

        <Divider colorful fullwidth />
        <Button
          bgColor="#00ADE8"
          onClick={handleSubmit}
          transparent={false}
          disabled={disabled}
          isLoading={transferPageStore.status === 'pending'}
        >
          Continue
        </Button>
      </Box>
    </Form>
  ));
});

export default TransferForm;

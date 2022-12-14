import { action, observable } from 'mobx';
import { HmyCrossShard } from 'cross-shard-transfer.sdk';
import { WALLET_TYPE } from 'cross-shard-transfer.sdk/lib/interfaces';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { TransferConfirmModal } from './components/TransferConfirmModal';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';
import { getNetworkConfig, NETWORK } from '../../constants/network';
import { MetaMaskNetworkConfig } from '../../interfaces/metamask';

export interface IDefaultForm {
  oneAmount: string;
  oneAddress: string;
}

const hmyCrossShard = new HmyCrossShard({
  walletType: WALLET_TYPE.METAMASK
});

export enum TRANSFER_MODE {
  SHARD0_TO_SHARD1 = 'SHARD0_TO_SHARD1',
  SHARD1_TO_SHARD0 = 'SHARD1_TO_SHARD0'
}

export class TransferPageStore extends StoreConstructor {
  defaultForm: IDefaultForm = {
    oneAmount: '0.0001',
    oneAddress: '',
  };

  @observable
  transferMode: TRANSFER_MODE = TRANSFER_MODE.SHARD1_TO_SHARD0;

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;

  public switchDirection() {
    if (this.transferMode === TRANSFER_MODE.SHARD0_TO_SHARD1) {
      this.transferMode = TRANSFER_MODE.SHARD1_TO_SHARD0;
      return;
    }
    this.transferMode = TRANSFER_MODE.SHARD0_TO_SHARD1;
  }

  @action.bound
  public async createTransfer() {
    if (!this.stores.userStore.isAuthorized) {
      this.stores.userStore.openConnectWalletModal();
      return;
    }
    this.status = 'pending';

    const transferUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting for user to sign transfer request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for transfer transaction to confirm',
      },
    });
    transferUiTx.setStatusWaitingSignIn();
    transferUiTx.showModal();

    try {
      const result = await hmyCrossShard.transfer(this.form.oneAmount, this.form.oneAddress, 1);

      // const result = await hmyClient.transfer(
      //   this.form.oneAddress,
      //   issueAmount,
      //   txHash => {
      //     transferUiTx.setTxHash(txHash);
      //     transferUiTx.setStatusProgress();
      //   },
      // );

      transferUiTx.setStatusSuccess();
      transferUiTx.hideModal();

      this.stores.actionModals.open(TransferConfirmModal, {
        applyText: '',
        closeText: '',
        width: '320px',
        noValidation: true,
        initData: {
          txHash: result.transactionHash,
          total: this.form.oneAmount,
        },
        onApply: () => {
          return Promise.resolve();
        },
      });

      this.status = 'success';
    } catch (err) {
      this.status = 'error';
      transferUiTx.setStatusFail();
      transferUiTx.setError(err);
      console.log('### Error during create issuePageStore', err);
      this.status = 'error';
    }
  }

  getRequiredNetwork(): MetaMaskNetworkConfig {
    if (this.transferMode === TRANSFER_MODE.SHARD1_TO_SHARD0) {
      return getNetworkConfig(NETWORK.HARMONY_SHARD_0);
    }

    return getNetworkConfig(NETWORK.HARMONY_SHARD_1);
  }
}

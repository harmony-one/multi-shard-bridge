import { action, observable } from 'mobx';
import { HmyCrossShard } from 'cross-shard-transfer.sdk';
import { WALLET_TYPE } from 'cross-shard-transfer.sdk/lib/interfaces';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { TransferConfirmModal } from './components/TransferConfirmModal';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';
import { getNetworkConfig, NETWORK } from '../../constants/network';
import { MetaMaskNetworkConfig } from '../../interfaces/metamask';
import { toWei } from 'web3-utils';

export interface IDefaultForm {
  oneAmount: string;
  oneAddress: string;
}

const hmyCrossShard = new HmyCrossShard({
  walletType: WALLET_TYPE.METAMASK,
});

export enum TRANSFER_MODE {
  SHARD0_TO_SHARD1 = 'SHARD0_TO_SHARD1',
  SHARD1_TO_SHARD0 = 'SHARD1_TO_SHARD0',
}

export enum SHARDS {
  SHARD0 = '0',
  SHARD1 = '1',
  SHARD2 = '2',
  SHARD3 = '3',
}

export class TransferPageStore extends StoreConstructor {
  defaultForm: IDefaultForm = {
    oneAmount: '0.0001',
    oneAddress: '',
  };

  @observable shardFrom = SHARDS.SHARD0;
  @observable shardTo = SHARDS.SHARD1;

  // @observable
  // transferMode: TRANSFER_MODE = TRANSFER_MODE.SHARD0_TO_SHARD1;

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;

  @action.bound
  public switchDirection() {
    // if (this.transferMode === TRANSFER_MODE.SHARD0_TO_SHARD1) {
    //   this.transferMode = TRANSFER_MODE.SHARD1_TO_SHARD0;
    //   return;
    // }
    // this.transferMode = TRANSFER_MODE.SHARD0_TO_SHARD1;
    const value = this.shardFrom;
    this.shardFrom = this.shardTo;
    this.shardTo = value;
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

    const shardId = Number(this.shardTo) as any;

    try {
      const result = await hmyCrossShard.transfer(
        toWei(this.form.oneAmount),
        this.form.oneAddress,
        shardId,
        txHash => {
          transferUiTx.setTxHash(txHash);
          transferUiTx.setStatusProgress();
        },
      );

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
      console.log('### Error during create transfer', err);
      this.status = 'error';
    }
  }

  getRequiredNetwork(): MetaMaskNetworkConfig {
    return getNetworkConfig(this.shardFrom);
  }

  getDestinationNetwork(): MetaMaskNetworkConfig {
    return getNetworkConfig(this.shardTo);
  }

  public isNetworkValid() {
    const currentNetwork = this.stores.userStore.getCurrentNetwork();

    return currentNetwork === this.getRequiredNetwork();
  }
}

import { action, autorun, computed, observable } from 'mobx';
import { IStores } from 'stores';
import { statusFetching } from '../constants';
import detectEthereumProvider from '@metamask/detect-provider';
import { getHmyBalance } from '../services/hmyClient';
import { StoreConstructor } from './core/StoreConstructor';
import { ConnectWalletModal } from '../components/Head/components/ConnectWalletModal';
import { config } from '../config';
import { addressIsEq } from '../utils/hmy';
import {
  getNetworkConfig,
  getNetworkConfigByChainId,
  NETWORK,
} from '../constants/network';
import { MetaMaskNetworkConfig } from '../interfaces/metamask';
import { SHARDS } from 'pages/Transfer/TransferPageStore';

const Web3 = require('web3');

export class UserStoreEx extends StoreConstructor {
  public stores: IStores;
  @observable public isAuthorized: boolean;
  public status: statusFetching;

  @observable error: string = '';
  @observable providerPromise = Promise.resolve(true);
  @observable public isMetaMask = false;
  private provider: any;

  @observable public sessionType: 'onewallet' | 'metamask';
  @observable public address: string;

  @observable public balance: string = '0';

  @observable public isInfoReading = false;
  @observable public isInfoNewReading = false;

  @observable metamaskChainId = 0;

  constructor(stores) {
    super(stores);

    const session = localStorage.getItem('harmony_session');

    const sessionObj = JSON.parse(session);

    if (sessionObj && sessionObj.isInfoReading) {
      this.isInfoReading = sessionObj.isInfoReading;
    }

    if (sessionObj && sessionObj.isInfoNewReading2) {
      this.isInfoNewReading = sessionObj.isInfoNewReading2;
    }

    if (sessionObj && sessionObj.address) {
      this.address = sessionObj.address;
      this.sessionType = sessionObj.sessionType;

      if (this.sessionType === 'metamask') {
        // const web3 = new Web3(window.web3.currentProvider);
        // web3.eth.net.getId().then(id => (this.metamaskChainId = id));

        if (sessionObj.address) {
          this.signInMetamask();
        }
      }

      this.isAuthorized = true;
    }

    autorun(() => {
      if (this.isMetamask) {
        this.signInMetamask();
      }
    });
  }

  @action
  public updateBalance() {
    this.getBalances();
  }

  @computed public get isMetamask() {
    return this.sessionType === 'metamask';
  }

  @action.bound
  setError(error: string) {
    this.error = error;
    this.isAuthorized = false;
  }

  @action.bound
  handleAccountsChanged(...args) {
    console.log('### accountChanged', args);
    if (args[0].length === 0) {
      return this.setError('Please connect to MetaMask');
    } else {
      this.address = args[0][0];

      this.syncLocalStorage();
    }
  }

  @computed
  get isBridgeAvailable() {
    if (config.bridge.available) {
      return true;
    }

    if (config.bridge.whiteListAddresses.length === 0) {
      return false;
    }

    if (!this.address) {
      return false;
    }

    return config.bridge.whiteListAddresses.reduce((acc, item) => {
      if (acc) {
        return acc;
      }

      return addressIsEq(item, this.address);
    }, false);
  }

  @action.bound
  public async registerProvider(): Promise<boolean> {
    if (this.provider) {
      return true;
    }

    const provider = await detectEthereumProvider();

    // @ts-ignore
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }

    if (!provider) {
      this.setError('Metamask not found');
      throw new Error('Metamask not found');
    }

    this.provider = provider;

    this.provider.on('accountsChanged', this.handleAccountsChanged);
    this.provider.on('chainChanged', chainId => {
      this.metamaskChainId = Number(chainId);
    });

    this.provider.on('disconnect', () => {
      console.log('### disconnect');
      this.isAuthorized = false;
      this.address = null;
    });

    return true;
  }

  @action.bound
  public async signInMetamask(isNew = false) {
    try {
      this.error = '';
      this.providerPromise = this.providerPromise.then(this.registerProvider);
      await this.providerPromise;
      console.log('### signin');

      this.provider
        .request({ method: 'eth_requestAccounts' })
        .then(async params => {
          this.handleAccountsChanged(params);
          const web3 = new Web3(window.web3.currentProvider);
          this.metamaskChainId = await web3.eth.net.getId();

          this.sessionType = 'metamask';

          if (isNew) {
            await this.provider.request({
              method: 'wallet_requestPermissions',
              params: [
                {
                  eth_accounts: {},
                },
              ],
            });
          }

          this.isAuthorized = true;
        })
        .catch(err => {
          if (err.code === 4001) {
            this.isAuthorized = false;
            this.address = null;
            this.syncLocalStorage();
            return this.setError('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
    } catch (e) {
      console.log('### e', e);
      return this.setError(e.message);
    }
  }

  @action public getBalances = async () => {
    if (this.address && this.isAuthorized) {
      try {
        this.balance = await getHmyBalance(this.address);
      } catch (e) {
        console.error(e);
      }
    }
  };

  private syncLocalStorage() {
    localStorage.setItem(
      'harmony_session',
      JSON.stringify({
        address: this.address,
        sessionType: this.sessionType,
        isInfoReading: this.isInfoReading,
        isInfoNewReading2: this.isInfoNewReading,
      }),
    );
  }

  @action public async openConnectWalletModal() {
    this.stores.actionModals.open(ConnectWalletModal, {
      applyText: '',
      closeText: '',
      initData: {},
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }

  @action
  public async switchNetwork(networkType: SHARDS) {
    const config = getNetworkConfig(networkType);

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [config],
          });
        } catch (addError) {
          console.log('### addError', addError);
        }
      } else {
        console.log('### ex', switchError);
      }
    }
  }

  public getCurrentNetwork(): MetaMaskNetworkConfig | null {
    return getNetworkConfigByChainId(this.metamaskChainId);
  }
}

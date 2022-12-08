import RouterStore from 'stores/RouterStore';
import { ActionModalsStore } from './ActionModalsStore';
import { UserStoreEx } from './UserStore';
import { createStoresContext } from './create-context';
import { UITransactionsStore } from '../modules/uiTransaction/UITransactionsStore';
import { TransferPageStore } from '../pages/Transfer/TransferPageStore';

import { RatesStore } from './RatesStore';

export interface IStores {
  routerStore?: RouterStore;
  actionModals?: ActionModalsStore;
  userStore?: UserStoreEx;
  transferPageStore?: TransferPageStore;
  uiTransactionsStore?: UITransactionsStore;
  ratesStore?: RatesStore;
}

const stores: IStores = {};

stores.routerStore = new RouterStore();
stores.uiTransactionsStore = new UITransactionsStore(stores);
stores.transferPageStore = new TransferPageStore(stores);
stores.actionModals = new ActionModalsStore();
stores.userStore = new UserStoreEx(stores);
stores.ratesStore = new RatesStore(stores);

if (!process.env.production) {
  window.stores = stores;
}

const { StoresProvider, useStores } = createStoresContext<typeof stores>();
export { StoresProvider, useStores };

export default stores;

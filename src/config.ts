import { parseInt } from 'lodash';
import logger from './modules/logger';

const log = logger.module('config');

interface Config {
  version: string;
  network: 'mainnet' | 'testnet';
  isTestnet: boolean;
  sentryDSN: string;
  harmony: {
    nodeUrl: string;
    shard0: {
      chainId: number;
      chainName: string;
      rpcUrl: string;
      explorerUrl: string;
    };
    shard1: {
      chainId: number;
      chainName: string;
      rpcUrl: string;
      explorerUrl: string;
    };
    explorer: {
      transaction: string;
      address: string;
    };
  };
  wallets: {
    metamask: boolean;
  };
  bridge: {
    available: boolean;
    whiteListAddresses: string[];
  };
}

export const config: Config = {
  version: process.env.APP_VERSION,
  network: process.env.NETWORK as 'mainnet' | 'testnet',
  isTestnet: process.env.NETWORK === 'testnet',
  sentryDSN: process.env.SENTRY_DSN || '',
  harmony: {
    shard0: {
      chainId: Number(process.env.HMY_CHAIN_ID),
      chainName: process.env.HMY_CHAIN_NAME,
      rpcUrl: process.env.HMY_NODE_URL,
      explorerUrl: process.env.HMY_EXPLORER,
    },
    shard1: {
      chainId: Number(process.env.HMY_CHAIN_ID_S1),
      chainName: process.env.HMY_CHAIN_NAME_S1,
      rpcUrl: process.env.HMY_NODE_URL_S1,
      explorerUrl: process.env.HMY_EXPLORER,
    },
    nodeUrl: process.env.HMY_NODE_URL,
    explorer: {
      transaction: process.env.HMY_EXPLORER_TX,
      address: process.env.HMY_EXPLORER_ADDRESS,
    },
  },
  wallets: {
    metamask: true,
  },
  bridge: {
    available: !!parseInt(process.env.SERVICE_AVAILABLE, 0),
    whiteListAddresses: (
      process.env.SERVICE_AVAILABLE_WHITELIST_ADDRESSES || ''
    ).split(','),
  },
} as const;

log.info('Config', config);

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
      chainId: number,
      chainName: string,
      rpcUrl: string,
      explorerUrl: string
    },
    shard1: {
      chainId: number,
      chainName: string,
      rpcUrl: string,
      explorerUrl: string
    },
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
      chainId: 1666700000,
      chainName: 'Harmony Shard 0',
      rpcUrl: 'https://api.s0.b.hmny.io',
      explorerUrl: 'https://explorer.pops.one/'
    },
    shard1: {
      chainId: 1666700001,
      chainName: 'Harmony Shard 1',
      rpcUrl: 'https://api.s1.b.hmny.io',
      explorerUrl: 'https://explorer.pops.one/',
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

import { numberToHex } from '../utils';
import { MetaMaskNetworkConfig } from '../interfaces/metamask';
import { config } from '../config';
import { SHARDS } from 'pages/Transfer/TransferPageStore';

export enum NETWORK {
  HARMONY_SHARD_0 = 'HARMONY_SHARD_0',
  HARMONY_SHARD_1 = 'HARMONY_SHARD_1',
}

export const HarmonyShard0: MetaMaskNetworkConfig = {
  chainId: numberToHex(config.harmony.shard0.chainId),
  chainName: config.harmony.shard0.chainName,
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
  rpcUrls: [config.harmony.shard0.rpcUrl],
  blockExplorerUrls: [config.harmony.shard0.explorerUrl],
};

export const HarmonyShard1: MetaMaskNetworkConfig = {
  chainId: numberToHex(config.harmony.shard1.chainId),
  chainName: config.harmony.shard1.chainName,
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
  rpcUrls: [config.harmony.shard1.rpcUrl],
  blockExplorerUrls: [config.harmony.shard1.explorerUrl],
};

export const HarmonyShard2: MetaMaskNetworkConfig = {
  chainId: numberToHex(config.harmony.shard2.chainId),
  chainName: config.harmony.shard2.chainName,
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
  rpcUrls: [config.harmony.shard2.rpcUrl],
  blockExplorerUrls: [config.harmony.shard2.explorerUrl],
};

export const HarmonyShard3: MetaMaskNetworkConfig = {
  chainId: numberToHex(config.harmony.shard3.chainId),
  chainName: config.harmony.shard3.chainName,
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
  rpcUrls: [config.harmony.shard3.rpcUrl],
  blockExplorerUrls: [config.harmony.shard3.explorerUrl],
};

const networkMapConfig = {
  [SHARDS.SHARD0]: HarmonyShard0,
  [SHARDS.SHARD1]: HarmonyShard1,
  [SHARDS.SHARD2]: HarmonyShard2,
  [SHARDS.SHARD3]: HarmonyShard3,
};

export const chainIdToNetwork = {
  [HarmonyShard0.chainId]: HarmonyShard0,
  [HarmonyShard1.chainId]: HarmonyShard1,
  [HarmonyShard2.chainId]: HarmonyShard2,
  [HarmonyShard3.chainId]: HarmonyShard3,
};

export const getNetworkConfig = (networkType: SHARDS) => {
  return networkMapConfig[networkType];
};

export const getNetworkConfigByChainId = (
  chainId: number | string,
): MetaMaskNetworkConfig | null => {
  return chainIdToNetwork[numberToHex(Number(chainId))];
};

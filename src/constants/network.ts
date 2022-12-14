import { numberToHex } from '../utils';
import { MetaMaskNetworkConfig } from '../interfaces/metamask';
import { config } from '../config';

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

const networkMapConfig = {
  [NETWORK.HARMONY_SHARD_0]: HarmonyShard0,
  [NETWORK.HARMONY_SHARD_1]: HarmonyShard1,
}

export const chainIdToNetwork = {
  [HarmonyShard0.chainId]: HarmonyShard0,
  [HarmonyShard1.chainId]: HarmonyShard1,
}

export const getNetworkConfig = (networkType: NETWORK) => {
  return networkMapConfig[networkType]
}

export const getNetworkConfigByChainId = (chainId: number | string): MetaMaskNetworkConfig | null => {
  return chainIdToNetwork[numberToHex(Number(chainId))];
}